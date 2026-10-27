import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Seats left over capacity. The text carries the state; the bar only repeats it. */
@Component({
  selector: 'app-seat-meter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meter" [class.meter--full]="available() === 0" [class.meter--low]="low()">
      <div class="meter__track" aria-hidden="true">
        <div class="meter__fill" [style.width.%]="percent()"></div>
      </div>
      <span class="meter__label">
        @if (available() === 0) {
          Full · {{ capacity() }} seats taken
        } @else {
          <strong>{{ available() }}</strong> of {{ capacity() }} seats left
        }
      </span>
    </div>
  `
})
export class SeatMeterComponent {
  readonly available = input.required<number>();
  readonly capacity = input.required<number>();

  protected readonly percent = computed(() => (this.capacity() ? (this.available() / this.capacity()) * 100 : 0));
  protected readonly low = computed(() => this.available() > 0 && this.available() <= Math.max(2, this.capacity() * 0.2));
}
