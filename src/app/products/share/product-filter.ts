import { Product } from '../models/product';
import { ProductFilterQuery } from './product-filter-query';

export class ProductFilter {
  constructor( public products: Product[] = [],
               public filterQuery: ProductFilterQuery ) {
  }

  filter() {
    return this
      .filterByCity()
      .filterByCategories()
      .filterByPriceRange()
      .products;
  }

  private filterByCity(): ProductFilter {
    // debugger;
    const { city } = this.filterQuery;
    if ( city ) {
      this.products = this.products.filter(( item ) => item.city === Number(city));
    }
    return this;
  }

  private filterByCategories(): ProductFilter {
    const { categories } = this.filterQuery;
    if ( categories && categories.length > 0 ) {
      this.products = this.products.filter(( product ) => categories.includes(product.category));
    }
    return this;
  }

  private filterByPriceRange(): ProductFilter {
    const { priceRange } = this.filterQuery;
    if ( priceRange && priceRange.length === 2 ) {
      const [ from, to ] = priceRange;
      this.products = this.products
        .filter(( product ) => product.price >= from && product.price <= to);
    }
    return this;
  }
}
