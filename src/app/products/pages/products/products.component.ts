import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor( public productService: ProductsService ) {
  }

  ngOnInit() {
    this.products$ = this.productService.getFilteredProducts();
  }
}
