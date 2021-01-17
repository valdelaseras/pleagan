import { Product } from '../product/product.model';
import { ICompany } from 'pleagan-model';

export class Company implements ICompany {
  id: string;
  name: string;
  product: Product;
  constructor(id: string, name: string, product: Product) {
    this.id = id;
    this.name = name;
    this.product = product;
  }
}
