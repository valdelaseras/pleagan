import { IProduct } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Product')
export class Product implements IProduct {
  @JsonProperty( 'id', String )
  id: string = '';

  @JsonProperty( 'name', String )
  name: string = '';

  @JsonProperty( 'ingredients', [String] )
  ingredients: string[] = [];
}
