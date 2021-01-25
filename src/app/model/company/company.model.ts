import { ICompany } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Company')
export class Company implements ICompany {
  @JsonProperty('id', Number)
  id = 0;

  @JsonProperty('name', String)
  name: string = '';
}
