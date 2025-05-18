import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

const routes: Routes = [
    { 
        path: '', 
        component: DataTableComponent,
        data: { renderMode: 'client' }
    },
    { 
        path: 'product', 
        component: ProductFormComponent,
        data: { renderMode: 'client' }
    },
    {
        path: 'product/:pId', 
        component: ProductFormComponent,
        data: { renderMode: 'client' }
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DataTableComponent,
        ProductFormComponent
    ]
})
export class ProductModule { }