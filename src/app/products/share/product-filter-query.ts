export interface IProductFilterQuery {
  categories?: number[];
  city?: number;
  priceRange?: number[];
}

export class ProductFilterQuery {
  categories: number[];
  city: number | string;
  priceRange: number[];

  constructor( data: IProductFilterQuery = {} ) {
    this.categories = data.categories || [];
    this.city = data.city || '';
    this.priceRange = data.priceRange || [ 0, 0 ];
  }
}
