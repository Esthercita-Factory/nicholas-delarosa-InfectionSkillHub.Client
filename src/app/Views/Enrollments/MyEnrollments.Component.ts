import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Enrollment, EnrollmentStatus } from '../../Models/api.models';
import { groupByDay } from '../../Services/agenda';
import { TIME_ZONE, problemMessage } from '../../Services/api.config';
import { EnrollmentsService, saveFile } from '../../Services/enrollments.service';
import { ToastService } from '../../Services/toast.service';
import { IconComponent } from '../Shared/Icon.Component';

type Filter = 'All' | EnrollmentStatus;

/** Enrollments of the signed in participant, filed by workshop day: cancel them and download their certificate. */
@Component({
  selector: 'app-my-enrollments',
  imports: [DatePipe, RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="enrollments" aria-labelledby="enrollments-title">
      <header class="agenda__header">
        <div>
          <h1 id="enrollments-title">My enrollments</h1>
          <p class="lede">Cancel up to 24 hours before a workshop starts. Every active enrollment has a PDF certificate.</p>
        </div>

        <div class="segmented" role="group" aria-label="Filter by status">
          @for (option of filters; track option) {
            <button type="button" class="segmented__option" [attr.aria-pressed]="filter() === option" (click)="filter.set(option)">
              {{ option }} <span class="segmented__count">{{ count(option) }}</span>
            </button>
          }
        </div>
      </header>

      @if (loading()) {
        <div class="skeleton-list" aria-busy="true" aria-label="Loading your enrollments">
          @for (row of [1, 2, 3]; track row) {
            <div class="skeleton-row"></div>
          }
        </div>
      } @else if (loadError()) {
        <div class="notice notice--error" role="alert">
          <app-icon name="alert" />
          <span>{{ loadError() }}</span>
          <button type="button" class="btn btn--quiet btn--sm" (click)="load()">Try again</button>
        </div>
      } @else if (days().length === 0) {
        <div class="empty">
          @if (filter() === 'All') {
            <h2>Your agenda is empty</h2>
            <p>Enroll in a workshop and it will be filed here under its day.</p>
            <a routerLink="/workshops" class="btn btn--primary btn--sm">Browse the agenda <app-icon name="arrow" [size]="16" /></a>
          } @else {
            <h2>No {{ filter().toLowerCase() }} enrollments</h2>
            <p>Switch the filter to see the rest of your enrollments.</p>
          }
        </div>
      } @else {
        @for (day of days(); track day.key) {
          <section class="day" [attr.aria-labelledby]="'mine-' + day.key">
            <h2 class="day__heading" [id]="'mine-' + day.key" [attr.aria-label]="day.date | date: 'EEEE, MMMM d, y' : timeZone">
              <span class="day__number" aria-hidden="true">{{ day.date | date: 'd' : timeZone }}</span>
              <span class="day__label" aria-hidden="true">
                <span>{{ day.date | date: 'EEEE' : timeZone }}</span>
                <span>{{ day.date | date: 'MMMM y' : timeZone }}</span>
              </span>
            </h2>

            <ul class="listing">
              @for (enrollment of day.items; track enrollment.id) {
                <li class="listing__row listing__row--enrollment" [class.listing__row--cancelled]="enrollment.status === 'Cancelled'">
                  <div class="listing__time">
                    <span>{{ enrollment.workshop.startsAt | date: 'HH:mm' : timeZone }}</span>
                    <span class="listing__end">{{ enrollment.workshop.endsAt | date: 'HH:mm' : timeZone }}</span>
                    <span class="code">{{ enrollment.workshop.code }}</span>
                  </div>

                  <div class="listing__what">
                    <h3 class="listing__title">{{ enrollment.workshop.title }}</h3>
                    <p class="listing__description">with {{ enrollment.workshop.instructorFullName }}</p>
                  </div>

                  <div class="listing__state">
                    @if (enrollment.status === 'Active') {
                      <span class="status status--active"><app-icon name="check" [size]="16" /> Active</span>
                    } @else {
                      <span class="status status--cancelled"><app-icon name="ban" [size]="16" /> Cancelled</span>
                    }
                    <p class="listing__meta">
                      Enrolled {{ enrollment.enrolledAt | date: 'MMM d, HH:mm' : timeZone }}
                      @if (enrollment.status === 'Cancelled') {
                        · cancelled {{ enrollment.cancelledAt | date: 'MMM d, HH:mm' : timeZone }} by {{ enrollment.cancelledBy }}
                      } @else if (enrollment.canCancel) {
                        · cancel until {{ enrollment.cancellationDeadline | date: 'MMM d, HH:mm' : timeZone }}
                      } @else {
                        · cancellation window closed
                      }
                    </p>
                  </div>

                  <div class="listing__actions">
                    @if (enrollment.hasCertificate) {
                      <button
                        type="button"
                        class="btn btn--primary btn--sm"
                        [class.btn--loading]="busy() === enrollment.id + ':certificate'"
                        [disabled]="busy() !== null"
                        (click)="download(enrollment)"
                      >
                        <app-icon name="download" [size]="16" /> Certificate
                      </button>
                    }
                    @if (enrollment.canCancel) {
                      <button
                        type="button"
                        class="btn btn--danger btn--sm"
                        [class.btn--loading]="busy() === enrollment.id + ':cancel'"
                        [disabled]="busy() !== null"
                        (click)="cancel(enrollment)"
                      >
                        Cancel enrollment
                      </button>
                    }
                  </div>
                </li>
              }
            </ul>
          </section>
        }
      }
    </section>
  `
})
export class MyEnrollmentsComponent {
  private readonly api = inject(EnrollmentsService);
  private readonly toasts = inject(ToastService);

  protected readonly timeZone = TIME_ZONE;
  protected readonly filters: Filter[] = ['All', 'Active', 'Cancelled'];
  protected readonly enrollments = signal<Enrollment[]>([]);
  protected readonly filter = signal<Filter>('All');
  protected readonly loading = signal(true);
  protected readonly loadError = signal<string | null>(null);
  /** "<enrollment id>:<action>" while a request is running. */
  protected readonly busy = signal<string | null>(null);

  /** Upcoming workshops first, in the order they happen; the API sends the newest first. */
  protected readonly days = computed(() => {
    const visible = this.enrollments()
      .filter((e) => this.filter() === 'All' || e.status === this.filter())
      .sort((a, b) => Date.parse(a.workshop.startsAt) - Date.parse(b.workshop.startsAt));
    return groupByDay(visible, (e) => e.workshop.startsAt);
  });

  constructor() {
    this.load();
  }

  protected count(filter: Filter): number {
    return filter === 'All' ? this.enrollments().length : this.enrollments().filter((e) => e.status === filter).length;
  }

  protected load(): void {
    this.loading.set(true);
    this.loadError.set(null);

    this.api.mine().subscribe({
      next: (enrollments) => {
        this.enrollments.set(enrollments);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.loadError.set(problemMessage(error, 'Could not load your enrollments.'));
        this.loading.set(false);
      }
    });
  }

  protected cancel(enrollment: Enrollment): void {
    if (!confirm(`Cancel your enrollment in "${enrollment.workshop.title}"? Your seat will be released.`)) {
      return;
    }

    this.busy.set(`${enrollment.id}:cancel`);
    this.api.cancel(enrollment.id).subscribe({
      next: (updated) => {
        this.enrollments.update((list) => list.map((e) => (e.id === updated.id ? updated : e)));
        this.toasts.ok(`Enrollment in ${enrollment.workshop.title} cancelled. The seat is free again.`);
        this.busy.set(null);
      },
      error: (error: unknown) => {
        this.toasts.error(problemMessage(error, 'Could not cancel the enrollment.'));
        this.busy.set(null);
        this.load();
      }
    });
  }

  protected download(enrollment: Enrollment): void {
    this.busy.set(`${enrollment.id}:certificate`);
    this.api.certificate(enrollment.id).subscribe({
      next: (file) => {
        saveFile(file);
        this.busy.set(null);
      },
      error: (error: unknown) => {
        this.toasts.error(problemMessage(error, 'Could not download the certificate.'));
        this.busy.set(null);
      }
    });
  }
}
