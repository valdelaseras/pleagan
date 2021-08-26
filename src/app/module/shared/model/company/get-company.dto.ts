import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject( 'GetCompanyDto' )
export class GetCompanyDto {
  @JsonProperty('id', Number )
  id: number;

  @JsonProperty('name', String )
  name: string;
}
