import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wordmark',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a routerLink="/workshops" class="wordmark" aria-label="InfectionSkillHub, go to workshops">
      <svg class="wordmark__mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <rect class="wordmark__sheet" width="32" height="32" rx="8" />
        <path class="wordmark__rings" d="M11 5v5M21 5v5M7 13h18" />
        <rect class="wordmark__day" x="17.5" y="17.5" width="6.5" height="6.5" rx="1.5" />
      </svg>
      <span>Infection<b>SkillHub</b></span>
    </a>
  `
})
export class WordmarkComponent {}
