import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { fieldErrors, problemMessage } from '../../Services/api.config';
import { AuthService } from '../../Services/auth.service';
import { IconComponent } from '../Shared/Icon.Component';
import { SeasonExcerptComponent } from '../Shared/SeasonExcerpt.Component';
import { ThemeToggleComponent } from '../Shared/ThemeToggle.Component';
import { WordmarkComponent } from '../Shared/Wordmark.Component';
import { ToastService } from '../../Services/toast.service';

/** Same policy as the API: 8+ characters with uppercase, lowercase, a digit and a symbol. */
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  return group.get('password')?.value === group.get('confirmPassword')?.value ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, IconComponent, SeasonExcerptComponent, ThemeToggleComponent, WordmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth">
      <app-season-excerpt />

      <main class="auth__panel">
        <app-wordmark class="auth__brand" />
        <app-theme-toggle class="auth__theme" />

        <form class="auth__form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <h1>Create your account</h1>
          <p class="lede">Sign up as a participant to enroll in workshops.</p>

          @if (error()) {
            <div class="notice notice--error" role="alert"><app-icon name="alert" /><span>{{ error() }}</span></div>
          }

          <label class="field">
            <span class="field__label">Full name</span>
            <input type="text" formControlName="fullName" autocomplete="name" [attr.aria-invalid]="show('fullName')" />
            @if (show('fullName')) {
              <small class="field__error"><app-icon name="alert" [size]="14" /> {{ serverErrors()['fullName'] ?? 'Enter your full name.' }}</small>
            }
          </label>

          <label class="field">
            <span class="field__label">Email</span>
            <input type="email" formControlName="email" autocomplete="email" [attr.aria-invalid]="show('email')" />
            @if (show('email')) {
              <small class="field__error"><app-icon name="alert" [size]="14" /> {{ serverErrors()['email'] ?? 'Enter a valid email.' }}</small>
            }
          </label>

          <label class="field">
            <span class="field__label">Password</span>
            <input type="password" formControlName="password" autocomplete="new-password" [attr.aria-invalid]="show('password')" />
            @if (show('password')) {
              <small class="field__error">
                <app-icon name="alert" [size]="14" />
                {{ serverErrors()['password'] ?? 'Use 8 or more characters with uppercase, lowercase, a digit and a symbol.' }}
              </small>
            } @else {
              <small class="field__hint">8 or more characters with uppercase, lowercase, a digit and a symbol.</small>
            }
          </label>

          <label class="field">
            <span class="field__label">Confirm password</span>
            <input
              type="password"
              formControlName="confirmPassword"
              autocomplete="new-password"
              [attr.aria-invalid]="form.hasError('mismatch') && form.controls.confirmPassword.touched"
            />
            @if (form.hasError('mismatch') && form.controls.confirmPassword.touched) {
              <small class="field__error"><app-icon name="alert" [size]="14" /> The passwords do not match.</small>
            }
          </label>

          <button type="submit" class="btn btn--primary btn--block" [class.btn--loading]="loading()" [disabled]="loading()">
            {{ loading() ? 'Creating account' : 'Create account' }}
          </button>

          <p class="auth__switch">Already have an account? <a routerLink="/login">Sign in</a></p>
        </form>
      </main>
    </div>
  `
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toasts = inject(ToastService);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly serverErrors = signal<Partial<Record<string, string>>>({});

  protected readonly form = inject(FormBuilder).nonNullable.group(
    {
      fullName: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: passwordsMatch }
  );

  protected show(control: 'fullName' | 'email' | 'password'): boolean {
    const field = this.form.controls[control];
    return (field.invalid && (field.touched || field.dirty)) || !!this.serverErrors()[control];
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.serverErrors.set({});

    const { fullName, email, password } = this.form.getRawValue();
    this.auth.register({ fullName, email, password }).subscribe({
      next: (user) => {
        this.toasts.ok(`Welcome to InfectionSkillHub, ${user.fullName}.`);
        void this.router.navigate(['/workshops']);
      },
      error: (error: unknown) => {
        const fields = fieldErrors(error);
        this.serverErrors.set(fields);
        this.error.set(Object.keys(fields).length ? null : problemMessage(error, 'Could not create the account.'));
        this.loading.set(false);
      }
    });
  }
}
