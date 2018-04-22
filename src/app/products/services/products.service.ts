import { Injectable } from '@angular/core';
import { ICategory } from '../models/category';
import { ICity } from '../models/city';
import { IProduct, Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ItemMap } from '../models/item-map';
import { ProductFilter } from '../share/product-filter';
import { categoriesMock, citiesMock, productsMock } from '../mocks';
import { ProductFilterQuery } from '../share/product-filter-query';

@Injectable()
export class ProductsService {
  categoriesMap: ItemMap = {};
  citiesMap: ItemMap = {};
  private bgImages = [
    '/assets/img/bg-1.jpg',
    '/assets/img/bg-3.jpg',
    '/assets/img/bg-2.jpg'
  ];
  private categories: ICategory[] = categoriesMock;
  private cities: ICity[] = citiesMock;
  private products: Product[] = [];
  private filteredProducts = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.categoriesMap = this.makeCategoriesMap(this.categories);
    this.citiesMap = this.makeCitiesMap(this.cities);
    this.products = this.transformProducts(productsMock);
  }

  getCategories(): ICategory[] {
    return [ ...this.categories ];
  }

  getCities(): ICity[] {
    return [ ...this.cities ];
  }

  getCategoriesCounters() {
    return this.products.reduce(( counters, { category } ) => {
      counters[ category ] = counters[ category ] || 0;
      counters[ category ] += 1;
      return counters;
    }, {});
  }

  getFilteredProducts(): Observable<Product[]> {
    return this.filteredProducts.asObservable();
  }

  getProductsMaxPrice(): number {
    let maxPrice = 0;
    this.products.forEach(( { price } ) => {
      if ( price > maxPrice ) {
        maxPrice = price;
      }
    });
    return maxPrice;
  }

  filterProducts( filter: ProductFilterQuery ) {
    this.filteredProducts.next(new ProductFilter(this.products, filter).filter());
  }

  private makeCategoriesMap( categories: ICategory[] ): ItemMap {
    return categories.reduce(( result, { id, name } ) => {
      result[ id ] = name;
      return result;
    }, {});
  }

  private makeCitiesMap( cities: ICity[] ): ItemMap {
    return cities.reduce(( result, { id, name } ) => {
      result[ id ] = name;
      return result;
    }, {});
  }

  private transformProducts( products: IProduct[] ): Product[] {
    return products.map(( item, i ) => {
      const product = new Product(item);
      product.image = this.bgImages[ i % this.bgImages.length ];
      product.categoryName = this.categoriesMap[ product.category ];
      product.cityName = this.citiesMap[ product.city ];
      return product;
    });
  }

}
