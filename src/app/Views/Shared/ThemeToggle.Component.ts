import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../Services/theme.service';
import { IconComponent } from './Icon.Component';

@Component({
  selector: 'app-theme-toggle',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="icon-button" [attr.aria-label]="label()" [title]="label()" (click)="themes.toggle()">
      <app-icon [name]="themes.theme() === 'dark' ? 'sun' : 'moon'" />
    </button>
  `
})
export class ThemeToggleComponent {
  protected readonly themes = inject(ThemeService);
  protected readonly label = computed(() => (this.themes.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'));
}
