import { Component, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div *ngIf="!isDeleting && !isCompleted && !hasError">
      <h2 mat-dialog-title>Confirm Deletion</h2>
      <mat-dialog-content>
        Are you sure you want to delete the product "{{data.title}}"?
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-flat-button color="warn" (click)="onConfirm()">Delete</button>
      </mat-dialog-actions>
    </div>

    <div *ngIf="isDeleting" class="loading-container">
      <mat-spinner diameter="50"></mat-spinner>
      <p>Deleting product...</p>
    </div>

    <div *ngIf="isCompleted">
      <h2 mat-dialog-title>Success</h2>
      <mat-dialog-content>
        Successfully deleted
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onClose()">Accept</button>
      </mat-dialog-actions>
    </div>

    <div *ngIf="hasError">
      <h2 mat-dialog-title>Error</h2>
      <mat-dialog-content>
        There was a problem, please try again later
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onClose()">Accept</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    .loading-container p {
      margin-top: 16px;
    }
  `]
})
export class ConfirmDeleteDialogComponent {
  isDeleting = false;
  isCompleted = false;
  hasError = false;
  confirmed = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.isDeleting = true;
    this.dialogRef.disableClose = true;
    this.confirmed.emit();
  }

  onClose(): void {
    this.dialogRef.close(this.isCompleted);
  }

  setComplete(success: boolean): void {
    this.isDeleting = false;
    if (success) {
      this.isCompleted = true;
    } else {
      this.hasError = true;
    }
    this.dialogRef.disableClose = false;
  }
}