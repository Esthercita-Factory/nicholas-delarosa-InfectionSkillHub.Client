import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { problemMessage } from '../../Services/api.config';
import { AuthService } from '../../Services/auth.service';
import { IconComponent } from '../Shared/Icon.Component';
import { SeasonExcerptComponent } from '../Shared/SeasonExcerpt.Component';
import { ThemeToggleComponent } from '../Shared/ThemeToggle.Component';
import { WordmarkComponent } from '../Shared/Wordmark.Component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, IconComponent, SeasonExcerptComponent, ThemeToggleComponent, WordmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth">
      <app-season-excerpt />

      <main class="auth__panel">
        <app-wordmark class="auth__brand" />
        <app-theme-toggle class="auth__theme" />

        <form class="auth__form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <h1>Sign in</h1>
          <p class="lede">Enroll in workshops and manage your enrollments.</p>

          @if (session() === 'expired') {
            <div class="notice notice--info"><app-icon name="clock" /><span>Your session expired. Sign in again.</span></div>
          }
          @if (error()) {
            <div class="notice notice--error" role="alert"><app-icon name="alert" /><span>{{ error() }}</span></div>
          }

          <label class="field">
            <span class="field__label">Email</span>
            <input type="email" formControlName="email" autocomplete="email" [attr.aria-invalid]="invalid('email')" />
            @if (invalid('email')) {
              <small class="field__error"><app-icon name="alert" [size]="14" /> Enter a valid email.</small>
            }
          </label>

          <label class="field">
            <span class="field__label">Password</span>
            <input type="password" formControlName="password" autocomplete="current-password" [attr.aria-invalid]="invalid('password')" />
            @if (invalid('password')) {
              <small class="field__error"><app-icon name="alert" [size]="14" /> Enter your password.</small>
            }
          </label>

          <button type="submit" class="btn btn--primary btn--block" [class.btn--loading]="loading()" [disabled]="loading()">
            {{ loading() ? 'Signing in' : 'Sign in' }}
          </button>

          <p class="auth__switch">New to InfectionSkillHub? <a routerLink="/register">Create an account</a></p>
          <p class="auth__switch"><a routerLink="/workshops">Browse the agenda without signing in</a></p>
        </form>
      </main>
    </div>
  `
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  /** ?returnUrl= page to go back to after signing in. */
  readonly returnUrl = input<string>();
  /** ?session=expired when the token expired. */
  readonly session = input<string>();

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  protected invalid(control: 'email' | 'password'): boolean {
    const field = this.form.controls[control];
    return field.invalid && (field.touched || field.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => void this.router.navigateByUrl(safeReturnUrl(this.returnUrl())),
      error: (error: unknown) => {
        this.error.set(problemMessage(error, 'Could not sign in.'));
        this.loading.set(false);
      }
    });
  }
}

/** Only internal routes: a returnUrl=https://... never takes the user off the site. */
export function safeReturnUrl(url: string | undefined): string {
  return url && url.startsWith('/') && !url.startsWith('//') ? url : '/workshops';
}
