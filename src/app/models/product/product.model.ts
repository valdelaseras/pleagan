import { IProduct } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Product')
export class Product implements IProduct {
  @JsonProperty('id', String)
  id = '';

  @JsonProperty('name', String)
  name = '';

  @JsonProperty('vegan', Boolean)
   vegan = false;

  @JsonProperty('ingredients', [String])
  ingredients: string[] = [];
}
