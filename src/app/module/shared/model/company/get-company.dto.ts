import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject( 'GetCompanyDto' )
export class GetCompanyDto {
  @JsonProperty('id', Number )
  id = 0;

  @JsonProperty('name', String )
  name = '';
}
