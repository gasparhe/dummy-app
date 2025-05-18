import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface DialogData {
  message: string;
}

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Success</h2>
    <mat-dialog-content data-testid="success-dialog">
      <p data-testid="success-message" role="status" aria-live="polite">{{data.message}}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button 
        mat-flat-button 
        color="primary" 
        (click)="onClose()"
        aria-label="Close success dialog">
        Accept
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      margin: 20px 0;
    }
  `]
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClose(): void {
    this.dialogRef.close(true);
  }
}