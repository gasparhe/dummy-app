import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  styleUrls: ['./action-button.component.css'],
  template: `
    <button mat-icon-button (click)="onClick()" class="action-button">
      <mat-icon [ngClass]="iconClass">{{ icon }}</mat-icon>
    </button>
  `
})
export class ActionButtonComponent {
  @Input() icon: 'edit'|'delete' = 'edit';
  @Input() iconClass: string = '';
  @Input() action: () => void = () => {};

  onClick() {
    if (this.action) {
      this.action();
    }
  }
}