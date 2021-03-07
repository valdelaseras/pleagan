import { IProduct } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Product')
export class Product implements IProduct {
  @JsonProperty('id', Number)
  id = 0;

  @JsonProperty('name', String)
  name = '';

  @JsonProperty('vegan', Boolean)
  vegan = false;

  @JsonProperty('imageUrl', String)
  imageUrl = '';

  @JsonProperty('animalIngredients', [String])
  animalIngredients: string[] = [];
}
