import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DataTableComponent } from './data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { By } from '@angular/platform-browser';

describe('DataTableComponent (standalone)', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        DataTableComponent, // standalone component
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        
      ],
      providers: [
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;

    // Provide mock data
    component.dataSource = [
      { column2: "0", column3: "0", column4: "0", name: 'Item 0' },
      { column2: "1", column3: "1", column4: "1", name: 'Item 1' }
    ];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of table rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(component.dataSource.length);
  });

  it('should navigate to edit page when edit button is clicked', () => {
    const editButton = fixture.debugElement.queryAll(By.css('button[aria-label="Edit item"]'))[0];
    editButton.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/edit', 0]);
  });

  it('should navigate to delete page when delete button is clicked', () => {
    const deleteButton = fixture.debugElement.queryAll(By.css('button[aria-label="Delete item"]'))[0];
    deleteButton.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['/delete', 0]);
  });
});
