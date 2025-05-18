import { Routes } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: DataTableComponent },
  { path: 'product', component: ProductFormComponent },
  { path: 'product/:pId', component: ProductFormComponent }
];
