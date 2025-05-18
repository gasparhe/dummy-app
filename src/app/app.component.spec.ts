import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './services/product.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let productService: ProductService;

  beforeEach(async () => {
    // Create spy for HttpClient
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterOutlet,
        DataTableComponent,
        MatToolbarModule,
        BrowserAnimationsModule
      ],
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpClientSpy },
        provideHttpClientTesting()
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'dummy-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('dummy-app');
  });

  it('should render title in toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Data Table Demo');
  });
});
