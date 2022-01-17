import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('GetProductDto')
export class GetProductDto {
  @JsonProperty('id', Number )
  id = 0;

  @JsonProperty('name', String )
  name = '';

  @JsonProperty('imageUrl', String )
  imageUrl = '';
}
