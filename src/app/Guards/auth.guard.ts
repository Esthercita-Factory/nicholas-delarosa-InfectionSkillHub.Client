import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

/** Participant pages: require a valid session; otherwise go to sign in remembering the destination. */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.token()) {
    return true;
  }

  if (auth.isAuthenticated()) {
    auth.logout('expired', state.url);
    return false;
  }

  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

/** Sign in and sign up make no sense with an active session: go to the catalog. */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.token() ? inject(Router).createUrlTree(['/workshops']) : true;
};
