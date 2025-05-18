import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActionButtonComponent } from './action-button.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ActionButtonComponent is standalone, we need impot it and its dependencies
      imports: [ActionButtonComponent, NoopAnimationsModule, MatIconModule, CommonModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // trigger ngOnInit and render the template
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default icon as "edit"', () => {
    expect(component.icon).toBe('edit');
  });

  it('should set icon input correctly', () => {
    component.icon = 'delete';
    fixture.detectChanges(); // Update the component
    expect(component.icon).toBe('delete');
  });

  it('should set iconClass input correctly', () => {
    component.iconClass = 'test-class';
    fixture.detectChanges();
    expect(component.iconClass).toBe('test-class');
  });

  it('should call action function on button click', () => {
    // Create spy to mock real request
    const actionSpy = jasmine.createSpy('action');
    component.action = actionSpy;

    // Simulate click on button
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(actionSpy).toHaveBeenCalled();
    expect(actionSpy).toHaveBeenCalledTimes(1);
  });

  it('should not throw error if action is not provided and button is clicked', () => {
    component.action = undefined as any; // Force action to be undefined
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(() => button.click()).not.toThrow();
  });
});