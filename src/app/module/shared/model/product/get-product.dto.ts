import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('ProductDto')
export class GetProductDto {
  @JsonProperty('id', Number )
  id = 0;

  @JsonProperty('name', String )
  name = '';

  @JsonProperty('imageUrl', String )
  imageUrl = '';
}
