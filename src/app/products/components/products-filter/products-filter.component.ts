import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsFilterService, ProductsService } from '../../services';
import { ICategory } from '../../models/category';
import { ICity } from '../../models/city';
import { ProductFilterQuery } from '../../models/product-filter-query';
import { IProductsByCategory } from '../../models/products-by-category';
import { Product } from '../../models/product';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: [ './products-filter.component.scss' ]
})
export class ProductsFilterComponent implements OnInit, OnDestroy {
  categories: ICategory[];
  cities: ICity[];
  maxPrice = 1;
  filter: ProductFilterQuery;
  productsByCategory: IProductsByCategory = {};
  private products: Product[] = [];
  private destroyed$ = new Subject<boolean>();

  constructor( private productsService: ProductsService,
               private productsFilterService: ProductsFilterService ) {
  }

  ngOnInit() {
    this.initData();
    this.productsService.getProducts().pipe(
      takeUntil(this.destroyed$)
    )
      .subscribe(( products ) => {
        this.products = products;
        this.productsByCategory = this.productsFilterService.countProductsByCategory(this.products);
        this.maxPrice = this.productsFilterService.getProductsMaxPrice(this.products);
        this.filter.priceRange[ 1 ] = this.maxPrice;
        this.filterProducts();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  filterProducts() {
    this.productsFilterService.filterProducts(this.products, this.filter);
  }

  isCategoryChecked( category: ICategory ): boolean {
    return this.filter.categories.includes(category.id);
  }

  toggleCategory( category: ICategory ) {
    const index = this.filter.categories.indexOf(category.id);
    if ( index >= 0 ) {
      this.filter.categories.splice(index, 1);
    } else {
      this.filter.categories.push(category.id);
    }
    this.filterProducts();
  }

  getProductsCountInCategory( category: ICategory ): number {
    return this.productsByCategory[ category.id ] || 0;
  }

  private initData() {
    this.filter = this.productsFilterService.getSavedFilter();
    this.categories = this.productsService.getCategories();
    this.cities = this.productsService.getCities();
  }
}
