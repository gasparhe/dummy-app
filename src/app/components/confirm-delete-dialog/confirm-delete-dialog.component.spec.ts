import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import mockProductData from '../../fixtures/mock-products.json';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { of, throwError } from 'rxjs';

describe('ConfirmDeleteDialogComponent', () => {
  let component: ConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDeleteDialogComponent>>;
  let productServiceMock: jasmine.SpyObj<ProductService>;
  
  const mockProduct: Product = mockProductData.products[0];

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'disableClose']);
    productServiceMock = jasmine.createSpyObj('ProductService', ['deleteProduct']);

    await TestBed.configureTestingModule({
      imports: [
        ConfirmDeleteDialogComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockProduct },
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show product title in confirmation message', () => {
    const content = fixture.nativeElement.querySelector('mat-dialog-content');
    expect(content.textContent).toContain(mockProduct.title);
  });

  it('should emit confirmed event and show loading on confirm', () => {
    productServiceMock.deleteProduct.and.returnValue(of(mockProduct));
    spyOn(component.confirmed, 'emit');
    
    component.onConfirm();
    expect(component.isDeleting).toBe(true);
    expect(dialogRef.disableClose).toBe(true);
    expect(component.confirmed.emit).toHaveBeenCalled();
  });

  it('should handle failed product deletion', () => {
    productServiceMock.deleteProduct.and.returnValue(throwError(() => new Error('Error')));
    
    component.onConfirm();
    component.setComplete(false);
    
    expect(component.isDeleting).toBe(false);
    expect(component.hasError).toBe(true);
    expect(component.isCompleted).toBe(false);
    expect(dialogRef.disableClose).toBe(false);
  });

  it('should close dialog with false on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should handle successful completion', () => {
    component.setComplete(true);
    
    expect(component.isDeleting).toBe(false);
    expect(component.isCompleted).toBe(true);
    expect(component.hasError).toBe(false);
    expect(dialogRef.disableClose).toBe(false);
  });

  it('should handle error completion', () => {
    component.setComplete(false);
    
    expect(component.isDeleting).toBe(false);
    expect(component.isCompleted).toBe(false);
    expect(component.hasError).toBe(true);
    expect(dialogRef.disableClose).toBe(false);
  });

  it('should close dialog with completion status on close', () => {
    component.isCompleted = true;
    component.onClose();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});