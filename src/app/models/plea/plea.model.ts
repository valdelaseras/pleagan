import { Company } from '../company/company.model';
import { Pleagan } from '../pleagan/pleagan.model';
import { IPlea, PLEA_STATUS } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Plea')
export class Plea implements IPlea {
  @JsonProperty('id', String)
  id: string = '';

  @JsonProperty('status', String)
  status: PLEA_STATUS = PLEA_STATUS.UNNOTIFIED;

  @JsonProperty('creationTimestamp', String)
  creationTimestamp: string = '';

  @JsonProperty('company', Company)
  company: Company = new Company();

  @JsonProperty('initiator', Pleagan)
  initiator: Pleagan = new Pleagan();

  @JsonProperty('supporters', [Pleagan])
  supporters: Pleagan[] = [];

  @JsonProperty('imageUrl', String)
  imageUrl: string = '';
}
