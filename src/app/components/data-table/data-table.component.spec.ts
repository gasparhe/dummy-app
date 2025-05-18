import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { ProductService } from '../../services/product.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { PageEvent } from '@angular/material/paginator';
import mockProductData from '../../fixtures/mock-products.json';
import { EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['getProducts', 'searchProducts', 'deleteProduct']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        DataTableComponent,
        ActionButtonComponent,
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    productServiceMock.getProducts.and.returnValue(of(mockProductData));
    productServiceMock.searchProducts.and.returnValue(of(mockProductData));
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;

    // Init paginator
    component.paginator = {
      pageIndex: 0,
      pageSize: 10,
      length: 0,
      page: new EventEmitter(),
      hasNextPage: () => false,
      hasPreviousPage: () => false
    } as any;

    // ngOnInit is executed here
    fixture.detectChanges(); 
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productServiceMock.getProducts).toHaveBeenCalledWith({
      limit: 10,
      skip: 0,
      sortBy: undefined,
      order: undefined
    });
    expect(component.products.length).toBe(mockProductData.products.length);
    expect(component.totalProducts).toBe(mockProductData.total);
  });

  it('should handle search', fakeAsync(() => {
    component.searchControl.setValue('test');
    tick(400); // Wait debounceTime
    // searchProducts called by the subscirption to valueChanges.
    // After query -> skip = 0.
    const expectedSearchParams = {
      limit: component.paginator?.pageSize || 10,
      skip: 0
    };
    expect(productServiceMock.searchProducts).toHaveBeenCalledWith('test', expectedSearchParams);
    expect(component.products.length).toBe(mockProductData.products.length);
    expect(component.totalProducts).toBe(mockProductData.total);
  }));

  it('should handle page event', () => {
    // Event page simualted
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 5, length: mockProductData.total };
    component.handlePageEvent(pageEvent);

    expect(component.paginator.pageIndex).toBe(1);
    expect(component.paginator.pageSize).toBe(5);

    // loadProducts called twice: ngOnInit + handlePageEvent.
    expect(productServiceMock.getProducts).toHaveBeenCalledTimes(2);

    const expectedParams = {
      limit: 5,
      skip: 5, // 1 * 5
      sortBy: component.sort?.active,
      order: component.sort?.direction as 'asc' | 'desc'
    };
    expect(productServiceMock.getProducts).toHaveBeenCalledWith(jasmine.objectContaining(expectedParams));
  });

  it('should navigate on edit', () => {
    component.onEdit(mockProductData.products[0]);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/edit', mockProductData.products[0].id]);
  });

  it('should have a delete button', () => {
    fixture.detectChanges();
    // find the ActionButtonComponent
    const actionButtons = fixture.debugElement.queryAll(By.directive(ActionButtonComponent));
    // check delete button exists
    const deleteButtonDebug = actionButtons.find(debugEl => debugEl.componentInstance.icon === 'delete');
    expect(deleteButtonDebug).toBeTruthy();
  });
});
