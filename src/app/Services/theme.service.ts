import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { storage } from './storage';

export type Theme = 'light' | 'dark';

export const THEME_KEY = 'infectionskillhub.theme';

/**
 * Light or dark mode. The choice is remembered; without one, the system preference wins.
 * index.html applies it before the first paint, so there is no flash of the wrong theme.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>(this.initial());

  constructor() {
    effect(() => this.document.documentElement.setAttribute('data-theme', this.theme()));
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    storage.set(THEME_KEY, next);
  }

  private initial(): Theme {
    const saved = storage.get<Theme>(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }

    return this.document.defaultView?.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}
