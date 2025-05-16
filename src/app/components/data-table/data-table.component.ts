import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

interface TableData {
  name: string;
  column2: string;
  column3: string;
  column4: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" aria-label="Data table">
      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef role="columnheader">Name</th>
        <td mat-cell *matCellDef="let element">{{element.name}}</td>
      </ng-container>

      <!-- Column 2 -->
      <ng-container matColumnDef="column2">
        <th mat-header-cell *matHeaderCellDef role="columnheader">Column 2</th>
        <td mat-cell *matCellDef="let element">{{element.column2}}</td>
      </ng-container>

      <!-- Column 3 -->
      <ng-container matColumnDef="column3">
        <th mat-header-cell *matHeaderCellDef role="columnheader">Column 3</th>
        <td mat-cell *matCellDef="let element">{{element.column3}}</td>
      </ng-container>

      <!-- Column 4 -->
      <ng-container matColumnDef="column4">
        <th mat-header-cell *matHeaderCellDef role="columnheader">Column 4</th>
        <td mat-cell *matCellDef="let element">{{element.column4}}</td>
      </ng-container>

      <!-- Edit Column -->
      <ng-container matColumnDef="edit">
        <th mat-header-cell *matHeaderCellDef role="columnheader" aria-label="Edit column"></th>
        <td mat-cell *matCellDef="let element; let index = index">
          <button mat-icon-button aria-label="Edit item" color="primary" (click)="onEdit(element, index)">
            <mat-icon>edit</mat-icon>
          </button>
        </td>
      </ng-container>

      <!-- Delete Column -->
      <ng-container matColumnDef="delete">
        <th mat-header-cell *matHeaderCellDef role="columnheader" aria-label="Delete column"></th>
        <td mat-cell *matCellDef="let element; let index = index">
          <button mat-icon-button aria-label="Delete item" color="warn" (click)="onDelete(element, index)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns" role="row"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;" role="row"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
      margin: 20px 0;
    }
    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class DataTableComponent {
  displayedColumns: string[] = ['name', 'column2', 'column3', 'column4', 'edit', 'delete'];

  constructor(private router: Router) {}

  onEdit(element: TableData, index: number): void {
    this.router.navigate(['/edit', index]);
  }

  onDelete(element: TableData, index: number): void {
    this.router.navigate(['/delete', index]);
  }
  
  dataSource: TableData[] = [
    { name: 'Item 1', column2: 'Value 2-1', column3: 'Value 3-1', column4: 'Value 4-1' },
    { name: 'Item 2', column2: 'Value 2-2', column3: 'Value 3-2', column4: 'Value 4-2' },
    { name: 'Item 3', column2: 'Value 2-3', column3: 'Value 3-3', column4: 'Value 4-3' },
    { name: 'Item 4', column2: 'Value 2-4', column3: 'Value 3-4', column4: 'Value 4-4' },
  ];
}