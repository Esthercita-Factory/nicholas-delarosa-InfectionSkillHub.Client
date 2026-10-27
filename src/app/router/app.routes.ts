import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '../Guards/auth.guard';

/**
 * Participant flow only: sign up, sign in, catalog, enrollments and certificates.
 * Employee operations are done on the API (Scalar). Every page is lazy loaded.
 */
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../Views/Auth/Login.Component').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
    title: 'Sign in · InfectionSkillHub'
  },
  {
    path: 'register',
    loadComponent: () => import('../Views/Auth/Register.Component').then((m) => m.RegisterComponent),
    canActivate: [guestGuard],
    title: 'Create account · InfectionSkillHub'
  },
  {
    path: '',
    loadComponent: () => import('../Views/Layout/Shell.Component').then((m) => m.ShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'workshops' },
      {
        // Public: any visitor can browse the workshops.
        path: 'workshops',
        loadComponent: () => import('../Views/Workshops/Catalog.Component').then((m) => m.CatalogComponent),
        title: 'Workshops · InfectionSkillHub'
      },
      {
        path: 'my-enrollments',
        loadComponent: () =>
          import('../Views/Enrollments/MyEnrollments.Component').then((m) => m.MyEnrollmentsComponent),
        canActivate: [authGuard],
        title: 'My enrollments · InfectionSkillHub'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
