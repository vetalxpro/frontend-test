import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ICategory } from '../../models/category';
import { ICity } from '../../models/city';
import { StorageService } from '../../../core/services/storage.service';
import { ProductFilterQuery } from '../../share/product-filter-query';
import { ICategoryCounters } from '../../models/category-counters';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: [ './products-filter.component.scss' ]
})
export class ProductsFilterComponent implements OnInit {
  categories: ICategory[];
  cities: ICity[];
  maxPrice = 0;
  filter = new ProductFilterQuery();
  categoriesCounters: ICategoryCounters = {};
  private filterStoreKey = 'products.filter';

  constructor( private productService: ProductsService,
               private storageService: StorageService ) {
  }

  ngOnInit() {
    this.initData();
    this.checkStoredFilter();
    this.filterProducts();
  }

  filterProducts() {
    this.storageService.setItem(this.filterStoreKey, this.filter);
    this.productService.filterProducts(this.filter);
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

  getCategoryCounter( category: ICategory ): number {
    return this.categoriesCounters[ category.id ] || 0;
  }

  private initData() {
    this.categories = this.productService.getCategories();
    this.cities = this.productService.getCities();
    this.maxPrice = this.productService.getProductsMaxPrice();
    this.filter.priceRange[ 1 ] = this.maxPrice;
    this.categoriesCounters = this.productService.getCategoriesCounters();
  }

  private checkStoredFilter() {
    const filter = this.storageService.getItem(this.filterStoreKey);
    this.filter = filter ? new ProductFilterQuery(filter) : this.filter;
  }

}
