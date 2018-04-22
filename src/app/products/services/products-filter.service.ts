import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { ProductFilterQuery } from '../models/product-filter-query';
import { StorageService } from '../../core/services/storage.service';
import { IProductsByCategory } from '../models/products-by-category';

@Injectable()
export class ProductsFilterService {
  private filteredProducts = new BehaviorSubject<Product[]>([]);
  private filterStoreKey = 'products.filter';

  constructor( private storageService: StorageService ) {
  }

  getSavedFilter(): ProductFilterQuery {
    const filter = this.storageService.getItem(this.filterStoreKey);
    if ( filter && typeof filter === 'object' ) {
      return new ProductFilterQuery(filter);
    }
    return new ProductFilterQuery({});
  }

  getFilteredProducts(): Observable<Product[]> {
    return this.filteredProducts.asObservable();
  }

  filterProducts( products: Product[], filter: ProductFilterQuery ) {
    this.storageService.setItem(this.filterStoreKey, filter);
    const { city, categories, priceRange } = filter;
    let filteredProducts = this.filterByCity(products, Number(city));
    filteredProducts = this.filterByCategories(filteredProducts, categories);
    filteredProducts = this.filterByPriceRange(filteredProducts, priceRange);
    this.filteredProducts.next(filteredProducts);
  }

  countProductsByCategory( products: Product[] ): IProductsByCategory {
    return products.reduce(( counters, { category } ) => {
      counters[ category ] = counters[ category ] || 0;
      counters[ category ] += 1;
      return counters;
    }, {});
  }

  getProductsMaxPrice( products: Product[] ): number {
    let maxPrice = 0;
    products.forEach(( { price } ) => {
      if ( price > maxPrice ) {
        maxPrice = price;
      }
    });
    return maxPrice;
  }

  private filterByCity( products: Product[], cityId: number ): Product[] {
    // debugger;
    if ( cityId ) {
      return products
        .filter(( { city } ) => city === cityId);
    }
    return products;
  }

  private filterByCategories( products: Product[], categories: number[] ): Product[] {
    if ( categories && categories.length > 0 ) {
      return products
        .filter(( { category } ) => categories.includes(category));
    }
    return products;
  }

  private filterByPriceRange( products: Product[], priceRange: number[] ): Product[] {
    if ( priceRange && priceRange.length === 2 ) {
      const [ from, to ] = priceRange;
      return products
        .filter(( { price } ) => price >= from && price <= to);
    }
    return products;
  }
}
