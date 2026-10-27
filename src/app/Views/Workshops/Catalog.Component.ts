import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { Workshop } from '../../Models/api.models';
import { groupByDay } from '../../Services/agenda';
import { TIME_ZONE, problemMessage } from '../../Services/api.config';
import { AuthService } from '../../Services/auth.service';
import { EnrollmentsService } from '../../Services/enrollments.service';
import { ToastService } from '../../Services/toast.service';
import { WorkshopsService } from '../../Services/workshops.service';
import { IconComponent } from '../Shared/Icon.Component';
import { SeatMeterComponent } from '../Shared/SeatMeter.Component';

/**
 * Public catalog set as the season's agenda: workshops filed under their day, with a day rail
 * that follows the scroll. A visitor is sent to sign in before enrolling.
 */
@Component({
  selector: 'app-catalog',
  imports: [DatePipe, IconComponent, SeatMeterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="agenda">
      <aside class="day-rail" aria-label="Season days">
        @if (days().length) {
          <ol class="day-rail__list" [style.--day]="activeIndex()">
            @for (day of days(); track day.key; let i = $index) {
              <li>
                <button
                  type="button"
                  class="day-rail__day"
                  [class.day-rail__day--active]="activeIndex() === i"
                  [attr.aria-current]="activeIndex() === i ? 'date' : null"
                  (click)="jumpTo(day.key, i)"
                >
                  <span class="day-rail__date">{{ day.date | date: 'EEE MMM d' : timeZone }}</span>
                  <span class="day-rail__count">{{ day.items.length }}</span>
                </button>
              </li>
            }
          </ol>
        }
      </aside>

      <section class="agenda__main" aria-labelledby="catalog-title">
        <header class="agenda__header">
          <div>
            <h1 id="catalog-title">This season's agenda</h1>
            <p class="lede">Workshops that have not started yet, filed by day. Seats update with every enrollment.</p>
          </div>

          <div class="filters" role="search">
            <label class="search">
              <app-icon name="search" [size]="16" />
              <span class="visually-hidden">Search workshops</span>
              <input
                type="search"
                placeholder="Title, code or instructor"
                [value]="term()"
                (input)="term.set($any($event.target).value)"
              />
            </label>
            <label class="switch">
              <input type="checkbox" [checked]="onlyOpen()" (change)="onlyOpen.set($any($event.target).checked)" />
              <span class="switch__track" aria-hidden="true"></span>
              <span>With seats left</span>
            </label>
          </div>
        </header>

        @if (loading()) {
          <div class="skeleton-list" aria-busy="true" aria-label="Loading workshops">
            @for (row of [1, 2, 3, 4]; track row) {
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
            @if (workshops().length === 0) {
              <h2>No workshops are scheduled right now</h2>
              <p>New workshops appear here as soon as InfectionSkillHub publishes them.</p>
            } @else {
              <h2>Nothing matches these filters</h2>
              <p>Try another title, code or instructor, or include full workshops.</p>
              <button type="button" class="btn btn--quiet btn--sm" (click)="clearFilters()">Clear filters</button>
            }
          </div>
        } @else {
          @for (day of days(); track day.key) {
            <section class="day" [attr.data-day]="day.key" [attr.aria-labelledby]="'day-' + day.key">
              <h2 class="day__heading" [id]="'day-' + day.key" [attr.aria-label]="day.date | date: 'EEEE, MMMM d' : timeZone">
                <span class="day__number" aria-hidden="true">{{ day.date | date: 'd' : timeZone }}</span>
                <span class="day__label" aria-hidden="true">
                  <span>{{ day.date | date: 'EEEE' : timeZone }}</span>
                  <span>{{ day.date | date: 'MMMM' : timeZone }}</span>
                </span>
                <span class="day__count" aria-hidden="true">{{ day.items.length }} {{ day.items.length === 1 ? 'workshop' : 'workshops' }}</span>
              </h2>

              <ul class="listing">
                @for (workshop of day.items; track workshop.id) {
                  <li class="listing__row" [class.listing__row--mine]="enrolledIds().has(workshop.id)">
                    <div class="listing__time">
                      <span>{{ workshop.startsAt | date: 'HH:mm' : timeZone }}</span>
                      <span class="listing__end">{{ workshop.endsAt | date: 'HH:mm' : timeZone }}</span>
                      <span class="code">{{ workshop.code }}</span>
                    </div>

                    <div class="listing__what">
                      <h3 class="listing__title">{{ workshop.title }}</h3>
                      <p class="listing__description">{{ workshop.description }}</p>
                    </div>

                    <div class="listing__who">
                      <span class="listing__instructor">{{ workshop.instructor.fullName }}</span>
                      <span class="listing__specialty">{{ workshop.instructor.specialty }}</span>
                    </div>

                    <app-seat-meter [available]="workshop.availableSeats" [capacity]="workshop.capacity" />

                    <div class="listing__action">
                      @if (enrolledIds().has(workshop.id)) {
                        <span class="status status--active"><app-icon name="check" [size]="16" /> Enrolled</span>
                      } @else {
                        <button
                          type="button"
                          class="btn btn--primary"
                          [class.btn--loading]="enrolling() === workshop.id"
                          [disabled]="workshop.availableSeats === 0 || enrolling() !== null"
                          (click)="enroll(workshop)"
                        >
                          {{ workshop.availableSeats === 0 ? 'Full' : enrolling() === workshop.id ? 'Enrolling' : 'Enroll' }}
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
    </div>
  `
})
export class CatalogComponent {
  private readonly workshopsApi = inject(WorkshopsService);
  private readonly enrollmentsApi = inject(EnrollmentsService);
  private readonly auth = inject(AuthService);
  private readonly toasts = inject(ToastService);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  private stopWatching: (() => void) | undefined;
  private jumping: ReturnType<typeof setTimeout> | undefined;

  protected readonly timeZone = TIME_ZONE;
  protected readonly workshops = signal<Workshop[]>([]);
  protected readonly enrolledIds = signal<ReadonlySet<string>>(new Set());
  protected readonly loading = signal(true);
  protected readonly loadError = signal<string | null>(null);
  protected readonly enrolling = signal<string | null>(null);
  protected readonly term = signal('');
  protected readonly onlyOpen = signal(false);
  protected readonly activeIndex = signal(0);

  protected readonly days = computed(() => {
    const term = this.term().trim().toLowerCase();
    const visible = this.workshops().filter(
      (w) =>
        (!this.onlyOpen() || w.availableSeats > 0) &&
        (!term ||
          [w.title, w.code, w.instructor.fullName, w.instructor.specialty].some((value) => value.toLowerCase().includes(term)))
    );
    return groupByDay(visible, (w) => w.startsAt);
  });

  constructor() {
    this.load();
    inject(DestroyRef).onDestroy(() => this.stopWatching?.());

    // Filters change which days exist: start the rail at the first one and observe the new sections.
    effect(() => {
      if (this.days().length) {
        this.activeIndex.set(0);
        this.watchDays();
      }
    });
  }

  protected load(): void {
    this.loading.set(true);
    this.loadError.set(null);

    this.workshopsApi.list().subscribe({
      next: (workshops) => {
        this.workshops.set(workshops);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.loadError.set(problemMessage(error, 'Could not load the workshops.'));
        this.loading.set(false);
      }
    });

    if (this.auth.token()) {
      this.enrollmentsApi.mine().subscribe({
        next: (enrollments) =>
          this.enrolledIds.set(new Set(enrollments.filter((e) => e.status === 'Active').map((e) => e.workshop.id))),
        error: () => this.enrolledIds.set(new Set())
      });
    }
  }

  protected enroll(workshop: Workshop): void {
    if (!this.auth.token()) {
      this.toasts.show('Sign in or create an account to enroll.');
      void this.router.navigate(['/login'], { queryParams: { returnUrl: '/workshops' } });
      return;
    }

    this.enrolling.set(workshop.id);
    this.enrollmentsApi.enroll(workshop.id).subscribe({
      next: () => {
        this.toasts.ok(`You are enrolled in ${workshop.title}.`);
        this.enrolling.set(null);
        this.load();
      },
      error: (error: unknown) => {
        this.toasts.error(problemMessage(error, 'Could not enroll in the workshop.'));
        this.enrolling.set(null);
        this.load();
      }
    });
  }

  protected jumpTo(key: string, index: number): void {
    this.activeIndex.set(index);
    clearTimeout(this.jumping);
    this.jumping = setTimeout(() => (this.jumping = undefined), 900);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.host.nativeElement
      .querySelector(`[data-day="${key}"]`)
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  protected clearFilters(): void {
    this.term.set('');
    this.onlyOpen.set(false);
  }

  /**
   * Marks in the rail the last day whose heading has reached the top of the viewport.
   * While a jump scrolls the page, the clicked day stays marked.
   */
  private watchDays(): void {
    afterNextRender(
      () => {
        this.stopWatching?.();
        const onScroll = () => {
          if (this.jumping) {
            return;
          }

          const line = 160;
          const sections = [...this.host.nativeElement.querySelectorAll<HTMLElement>('[data-day]')];
          let index = 0;
          sections.forEach((section, i) => {
            if (section.getBoundingClientRect().top <= line) {
              index = i;
            }
          });
          this.activeIndex.set(index);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        this.stopWatching = () => window.removeEventListener('scroll', onScroll);
        onScroll();
      },
      { injector: this.injector }
    );
  }
}
