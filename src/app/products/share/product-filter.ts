import { Product } from '../models/product';
import { ProductFilterQuery } from './product-filter-query';

export class ProductFilter {
  constructor( public products: Product[] = [],
               public filterQuery: ProductFilterQuery ) {
  }

  filter(): Product[] {
    return this
      .filterByCity()
      .filterByCategories()
      .filterByPriceRange()
      .products;
  }

  private filterByCity(): ProductFilter {
    // debugger;
    const { city: cityId } = this.filterQuery;
    if ( cityId ) {
      this.products = this.products
        .filter(( { city } ) => city === Number(cityId));
    }
    return this;
  }

  private filterByCategories(): ProductFilter {
    const { categories } = this.filterQuery;
    if ( categories && categories.length > 0 ) {
      this.products = this.products
        .filter(( { category } ) => categories.includes(category));
    }
    return this;
  }

  private filterByPriceRange(): ProductFilter {
    const { priceRange } = this.filterQuery;
    if ( priceRange && priceRange.length === 2 ) {
      const [ from, to ] = priceRange;
      this.products = this.products
        .filter(( { price } ) => price >= from && price <= to);
    }
    return this;
  }
}
