import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'; import { ActionButtonComponent } from '../action-button/action-button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    ActionButtonComponent,
    MatDialogModule
  ],
  styleUrls: ['./data-table.component.css'],
  template: `
    <mat-form-field appearance="outline" class="w-100">
      <mat-label>Search</mat-label>
      <input matInput [formControl]="searchControl" placeholder="Search products..." data-testid="search-input" aria-label="Search products">
      <button mat-icon-button matSuffix data-testid="search-button">
        <mat-icon>search</mat-icon>
      </button>
    </mat-form-field>

    
    <button mat-raised-button color="primary" (click)="createNewProduct()" class="action-button" aria-label="Create new product" data-testid="add-product-button">
      <mat-icon>add</mat-icon>
      <span>New Product</span>
    </button>
    
    <table mat-table [dataSource]="products" matSort class="mat-elevation-z8" data-testid="product-list" role="list">
      <!-- Image Column -->
      <ng-container matColumnDef="image">
        <th mat-header-cell *matHeaderCellDef>Image</th>
        <td mat-cell *matCellDef="let product" class="cell-image">
          <img [src]="product.images[0]" [alt]="product.title">
        </td>
      </ng-container>

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>
        <td mat-cell *matCellDef="let product" class="cell-title" data-testid="product-title">{{product.title}}</td>
      </ng-container>

      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Category</th>
        <td mat-cell *matCellDef="let product" class="cell-category">{{product.category}}</td>
      </ng-container>

      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Price</th>
        <td mat-cell *matCellDef="let product" class="cell-price">{{product.price | currency}}</td>
      </ng-container>

      <!-- Actions: Edit and Delete in the same row -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let product" class="cell-actions">
          <app-action-button
            [icon]="'edit'"
            [iconClass]="'icon-orange'"
            [action]="onEdit.bind(this, product)"
            data-testid="edit-button"
            aria-label="Edit product">
          </app-action-button>
          <app-action-button
            [icon]="'delete'"
            [iconClass]="'icon-red'"
            [action]="onDelete.bind(this, product)"
            data-testid="delete-button"
            aria-label="Delete product">
          </app-action-button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
          data-testid="product-card" 
          role="listitem"
          (click)="onRowClick(row)"
          class="clickable-row"
          [attr.aria-label]="'View details of ' + row.title"></tr>
    </table>

    <mat-paginator 
      [length]="totalProducts"
      [pageSize]="10"
      [pageSizeOptions]="[5, 10, 25, 100]"
      (page)="handlePageEvent($event)"
      aria-label="Select page">
      <button mat-icon-button data-testid="previous-page-button" aria-label="Previous page">
        <mat-icon>chevron_left</mat-icon>
      </button>
      <button mat-icon-button data-testid="next-page-button" aria-label="Next page">
        <mat-icon>chevron_right</mat-icon>
      </button>
    </mat-paginator>
  `
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;

  displayedColumns: string[] = ['image', 'title', 'category', 'price', 'actions'];
  products: Product[] = [];
  totalProducts = 0;
  searchControl = new FormControl('');

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // Set debounce in the search
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => {
        // Restart page index when do a search
        if (query) {
          this.paginator.pageIndex = 0;
        }

        const params = {
          limit: this.paginator?.pageSize || 10,
          skip: query ? 0 : (this.paginator?.pageIndex * (this.paginator?.pageSize || 10))
        };

        return query ?
          this.productService.searchProducts(query, params) :
          this.productService.getProducts(params);
      })
    ).subscribe(response => {
      this.products = response.products;
      this.totalProducts = response.total;
      if (this.table) {
        this.table.renderRows();
      }
    });

    // do first query
    this.loadProducts();
  }


  createNewProduct() {
    this.router.navigate(['/product/']);
    }
    
  onEdit(product: Product) {
    this.router.navigate(['/product/', product.id]);
  }

  onRowClick(product: Product) {
    this.router.navigate([`/product-description/${product.id}`]);
  }

  onDelete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: product
    });

    const dialogInstance = dialogRef.componentInstance;

    // With the current API, we don't need reload the table after the deletion because server doesn't remove the item.
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Product deleted:', product, 'the instruction `this.loadProducts();` is not needed');
      }
    });


    const subscription = dialogRef.componentInstance.confirmed.subscribe(() => {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          dialogInstance.setComplete(true);
          // The server don't remove the item, so we simulate the remove in the front end to avoid reload the table and lose the current page.
          this.products = this.products.filter(p => p.id !== product.id);
          this.totalProducts--;
          if (this.table) {
            this.table.renderRows();
          }
        },
        error: () => {
          dialogInstance.setComplete(false);
        }
      });
    });

    dialogRef.afterClosed().subscribe(() => {
      subscription.unsubscribe();
    });
  }

  ngAfterViewInit() {
    // Subscribe to sort change events and reload products when they change
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.loadProducts();
    });
  }
  handlePageEvent(event: PageEvent) {
    // Update page size and index
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.loadProducts();
  }

  loadProducts() {
    const params = {
      limit: this.paginator?.pageSize || 10,
      skip: this.paginator?.pageIndex * (this.paginator?.pageSize || 10),
      sortBy: this.sort?.active,
      order: this.sort?.direction as 'asc' | 'desc'
    };

    const query = this.searchControl.value;

    if (query) {
      this.productService.searchProducts(query, params).subscribe(response => {
        this.products = response.products;
        this.totalProducts = response.total;
        if (this.table) {
          this.table.renderRows();
        }
      });
    } else {
      this.productService.getProducts(params).subscribe(response => {
        this.products = response.products;
        this.totalProducts = response.total;
        if (this.table) {
          this.table.renderRows();
        }
      });
    }
  }


}