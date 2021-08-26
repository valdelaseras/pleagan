import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject( 'GetPleaCompanyDto' )
export class GetPleaCompanyDto {
  @JsonProperty('id', Number )
  id: number;

  @JsonProperty('name', String )
  name: string;
}
