import { Company } from '../company';
import { Pleagan } from '../pleagan';
import { IPlea, PLEA_STATUS } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Product } from '../product';
import { Support } from './support.model';

@JsonObject('Plea')
export class Plea implements IPlea {
  @JsonProperty('id', Number)
  id = 0;

  @JsonProperty('status', String)
  status: PLEA_STATUS = PLEA_STATUS.UNNOTIFIED;

  @JsonProperty('description', String)
  description: string = '';

  @JsonProperty('createdAt', String)
  createdAt = new Date();

  @JsonProperty('company', Company)
  company: Company = new Company();

  @JsonProperty('initiator', Pleagan)
  initiator: Pleagan = new Pleagan();

  @JsonProperty('supports', [Support])
  supports: Support[] = [];

  @JsonProperty('nonVeganProduct', Product)
  nonVeganProduct: Product = new Product();

  @JsonProperty('veganProduct', Product)
  veganProduct?: Product = new Product();
}
