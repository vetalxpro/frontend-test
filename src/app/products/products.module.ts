import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { ProductItemComponent, ProductsFilterComponent, ProductsListComponent } from './components';
import { ProductsService } from './services/products.service';
import { CheckboxModule } from '../ui/checkbox/checkbox.module';
import { NouisliderModule } from 'ng2-nouislider';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ProductsFilterService } from './services/products-filter.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    PipesModule,
    ProductsRoutingModule,
    NouisliderModule
  ],
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductItemComponent,
    ProductsFilterComponent
  ],
  providers: [
    ProductsService,
    ProductsFilterService
  ]
})
export class ProductsModule {
}
