import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Workshop } from '../../Models/api.models';
import { TIME_ZONE } from '../../Services/api.config';
import { WorkshopsService } from '../../Services/workshops.service';
import { WordmarkComponent } from './Wordmark.Component';

/** Side panel of the sign in and sign up pages: the next workshops of the real agenda. */
@Component({
  selector: 'app-season-excerpt',
  imports: [DatePipe, WordmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="excerpt" aria-labelledby="excerpt-title">
      <app-wordmark />

      @if (range(); as season) {
        <p class="excerpt__season">
          <span>{{ season.first | date: 'MMM d' : timeZone }}</span>
          <span class="excerpt__to">to</span>
          <span>{{ season.last | date: 'MMM d, y' : timeZone }}</span>
        </p>
      }

      <h2 id="excerpt-title" class="excerpt__title">Coming up at InfectionSkillHub</h2>

      @if (next().length) {
        <ol class="excerpt__list">
          @for (workshop of next(); track workshop.id) {
            <li class="excerpt__item">
              <span class="excerpt__date">{{ workshop.startsAt | date: 'EEE MMM d' : timeZone }}</span>
              <span class="excerpt__time">{{ workshop.startsAt | date: 'HH:mm' : timeZone }}</span>
              <span class="excerpt__name">{{ workshop.title }}</span>
              <span class="excerpt__seats">{{ workshop.availableSeats }} of {{ workshop.capacity }} seats left</span>
            </li>
          }
        </ol>
      } @else {
        <p class="excerpt__note">Short in-person workshops in photography, cooking, public speaking, design, music and marketing.</p>
      }
    </aside>
  `
})
export class SeasonExcerptComponent {
  protected readonly timeZone = TIME_ZONE;
  private readonly season = signal<Workshop[]>([]);

  protected readonly next = computed(() => this.season().slice(0, 4));
  /** First and last workshop of the season, set as the panel's masthead. */
  protected readonly range = computed(() => {
    const season = this.season();
    return season.length ? { first: season[0].startsAt, last: season[season.length - 1].startsAt } : null;
  });

  constructor() {
    inject(WorkshopsService)
      .list()
      .subscribe({ next: (workshops) => this.season.set(workshops), error: () => this.season.set([]) });
  }
}
