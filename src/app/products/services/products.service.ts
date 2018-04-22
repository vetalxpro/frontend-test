import { Injectable } from '@angular/core';
import { ICategory } from '../models/category';
import { ICity } from '../models/city';
import { IProduct, Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ItemMap } from '../models/item-map';
import { categoriesMock, citiesMock, productsMock } from '../mocks';

@Injectable()
export class ProductsService {
  categoriesMap: ItemMap = {};
  citiesMap: ItemMap = {};
  private bgImages = [
    './assets/img/bg-1.jpg',
    './assets/img/bg-3.jpg',
    './assets/img/bg-2.jpg'
  ];
  private categories: ICategory[] = categoriesMock;
  private cities: ICity[] = citiesMock;
  private products = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.categoriesMap = this.makeCategoriesMap(this.categories);
    this.citiesMap = this.makeCitiesMap(this.cities);
    this.products.next(this.transformProducts(productsMock));
  }

  getCategories(): ICategory[] {
    return [ ...this.categories ];
  }

  getCities(): ICity[] {
    return [ ...this.cities ];
  }

  getProducts(): Observable<Product[]> {
    return this.products.asObservable();
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
