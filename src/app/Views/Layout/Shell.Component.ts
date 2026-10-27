import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { IconComponent } from '../Shared/Icon.Component';
import { ThemeToggleComponent } from '../Shared/ThemeToggle.Component';
import { WordmarkComponent } from '../Shared/Wordmark.Component';

/** Header and navigation. The catalog is public; "My enrollments" appears once signed in. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent, ThemeToggleComponent, WordmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#content">Skip to content</a>

    <header class="topbar">
      <div class="container topbar__inner">
        <app-wordmark />

        <nav class="nav" aria-label="Main">
          <a routerLink="/workshops" routerLinkActive="nav__link--active" ariaCurrentWhenActive="page" class="nav__link">Workshops</a>
          @if (auth.isAuthenticated()) {
            <a routerLink="/my-enrollments" routerLinkActive="nav__link--active" ariaCurrentWhenActive="page" class="nav__link">
              My enrollments
            </a>
          }
        </nav>

        <div class="topbar__account">
          <app-theme-toggle />
          @if (auth.user(); as user) {
            <span class="topbar__user" [title]="user.email">
              <app-icon name="user" [size]="16" />
              <span>{{ auth.firstName() }}</span>
            </span>
            <button type="button" class="icon-button" aria-label="Sign out" title="Sign out" (click)="auth.logout()">
              <app-icon name="logout" />
            </button>
          } @else {
            <a routerLink="/login" class="btn btn--quiet btn--sm">Sign in</a>
            <a routerLink="/register" class="btn btn--primary btn--sm">Create account</a>
          }
        </div>
      </div>
    </header>

    <main id="content" class="container page" tabindex="-1">
      <router-outlet />
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <span>InfectionSkillHub · short in-person workshops</span>
        <span>All times in Bogotá time, UTC-05:00</span>
      </div>
    </footer>
  `
})
export class ShellComponent {
  protected readonly auth = inject(AuthService);
}
