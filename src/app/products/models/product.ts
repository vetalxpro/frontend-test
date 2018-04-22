export interface IProduct {
  id: number;
  name: string;
  city: number;
  category: number;
  price: number;
}

export class Product implements IProduct {
  id: number;
  name: string;
  city: number;
  cityName: string;
  category: number;
  categoryName: string;
  price: number;
  image: string;

  constructor( data: IProduct ) {
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.category = data.category;
    this.price = data.price;
  }
}
