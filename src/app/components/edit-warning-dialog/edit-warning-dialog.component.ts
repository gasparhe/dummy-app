import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface DialogData {
  title: string;
}

@Component({
  selector: 'app-edit-warning-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Confirm Edit</h2>
    <mat-dialog-content>
      Are you sure you want to edit the product "{{data.title}}"?
      This action cannot be undone.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button 
        mat-button 
        (click)="onCancel()"
        aria-label="Cancel edit operation">
        Cancel
      </button>
      <button 
        mat-flat-button 
        color="primary" 
        (click)="onConfirm()"
        aria-label="Confirm edit operation">
        Confirm
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      margin: 20px 0;
    }
  `]
})
export class EditWarningDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}