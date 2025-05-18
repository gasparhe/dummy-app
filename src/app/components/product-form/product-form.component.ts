import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../services/product.service';
import { EditWarningDialogComponent } from '../edit-warning-dialog/edit-warning-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  host: {
    '[attr.role]': "'form'",
    '[attr.aria-label]': "isEditMode ? 'Edit Product Form' : 'Create Product Form'",
    '[attr.data-testid]': "'product-form'"
  }
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('pId');
    this.isEditMode = !!this.productId;
    if (this.isEditMode && this.productId) {
      this.loading = true;
      this.errorMessage = null;
      this.productService.getProductById(Number(this.productId)).subscribe({
        next: (product) => {
          this.productForm.patchValue(product);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Error loading product';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;
    if (this.isEditMode) {
      this.openEditWarning();
    } else {
      this.createProduct();
    }
  }

  openEditWarning(): void {
    const dialogRef = this.dialog.open(EditWarningDialogComponent, {
      width: '400px',
      data: { title: this.productForm.value.title }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct();
      }
    });
  }

  createProduct(): void {
    this.loading = true;
    this.errorMessage = null;
    this.productService.addProduct(this.productForm.value).subscribe({
      next: () => this.showSuccessModal(),
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error creating product';
      }
    });
  }

  updateProduct(): void {
    if (!this.productId) return;
    this.loading = true;
    this.errorMessage = null;
    this.productService.updateProduct(Number(this.productId), this.productForm.value).subscribe({
      next: () => this.showSuccessModal(),
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error updating product';
      }
    });
  }

  showSuccessModal(): void {
    this.loading = false;
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      data: { message: this.isEditMode ? 'Product updated successfully.' : 'Product created successfully.' },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }
}