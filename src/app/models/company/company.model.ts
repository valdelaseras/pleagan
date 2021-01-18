import { Product } from '../product/product.model';
import { ICompany } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Company')
export class Company implements ICompany {
  @JsonProperty('id', String)
  id: string = '';

  @JsonProperty('name', String)
  name: string = '';

  @JsonProperty('product', Product)
  product: Product = new Product();
}
