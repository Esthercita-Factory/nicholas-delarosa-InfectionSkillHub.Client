import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthResponse, LoginRequest, PARTICIPANT_ROLE, RegisterRequest, UserProfile } from '../Models/api.models';
import { API_URL } from './api.config';
import { storage } from './storage';

export interface Session {
  token: string;
  /** ISO 8601, comes from the API (expiresAt). */
  expiresAt: string;
  user: UserProfile;
}

export type LogoutReason = 'manual' | 'expired';

const SESSION_KEY = 'infectionskillhub.session';

/**
 * Participant session. The JWT is kept in localStorage and sent on every request by the
 * interceptor. When it expires the session closes by itself and the user goes back to sign in.
 *
 * This client is only for participants: employees work on the API through Scalar, so their
 * token is discarded here.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly session = signal<Session | null>(null);
  private expiryTimer: ReturnType<typeof setTimeout> | undefined;

  readonly user = computed(() => this.session()?.user ?? null);
  readonly isAuthenticated = computed(() => this.session() !== null);
  readonly firstName = computed(() => this.user()?.fullName.split(' ').find(Boolean) ?? '');

  constructor() {
    const saved = storage.get<Session>(SESSION_KEY);
    if (saved && AuthService.isValid(saved)) {
      this.start(saved);
    } else {
      storage.remove(SESSION_KEY);
    }
  }

  /** Current token, or null when there is none or it expired. */
  token(): string | null {
    const current = this.session();
    return current && AuthService.isValid(current) ? current.token : null;
  }

  login(request: LoginRequest): Observable<UserProfile> {
    return this.http
      .post<AuthResponse>(`${API_URL}/auth/login`, request)
      .pipe(map((response) => this.accept(response)));
  }

  register(request: RegisterRequest): Observable<UserProfile> {
    return this.http
      .post<AuthResponse>(`${API_URL}/auth/register`, request)
      .pipe(map((response) => this.accept(response)));
  }

  /** Clears the token and goes to sign in. With 'expired' the sign in page explains why. */
  logout(reason: LogoutReason = 'manual', returnUrl?: string): void {
    clearTimeout(this.expiryTimer);
    this.session.set(null);
    storage.remove(SESSION_KEY);

    const queryParams = reason === 'expired' ? { session: 'expired', returnUrl } : {};
    void this.router.navigate(reason === 'expired' ? ['/login'] : ['/workshops'], { queryParams });
  }

  /** The token is usable while it has not expired (with a 10 s margin for latency). */
  static isValid(session: Session, now = Date.now()): boolean {
    return new Date(session.expiresAt).getTime() - 10_000 > now;
  }

  private accept(response: AuthResponse): UserProfile {
    if (response.user.role !== PARTICIPANT_ROLE) {
      throw new Error('This is an employee account. Employees manage InfectionSkillHub from the API reference (Scalar).');
    }

    this.start({ token: response.accessToken, expiresAt: response.expiresAt, user: response.user });
    return response.user;
  }

  private start(session: Session): void {
    this.session.set(session);
    storage.set(SESSION_KEY, session);

    // Automatic sign out when the token expires, even without any request.
    clearTimeout(this.expiryTimer);
    const remaining = new Date(session.expiresAt).getTime() - Date.now();
    this.expiryTimer = setTimeout(() => this.logout('expired', this.router.url), Math.max(remaining, 0));
  }
}
