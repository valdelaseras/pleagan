import { Company } from '../company/company.model';
import { Pleagan } from '../pleagan/pleagan.model';
import { IPlea, PLEA_STATUS } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Product } from '../product/product.model';
import { Support } from './support.model';

@JsonObject('Plea')
export class Plea implements IPlea {
  @JsonProperty('id', Number)
  id = 0;

  @JsonProperty('numberOfSupports', Number, true)
  numberOfSupports = 0;

  @JsonProperty('status', String)
  status: PLEA_STATUS = PLEA_STATUS.UNNOTIFIED;

  @JsonProperty('description', String)
  description: string = '';

  @JsonProperty('createdAt', String)
  createdAt = new Date();

  @JsonProperty('company', Company)
  company: Company = new Company();

  @JsonProperty('nonVeganProduct', Product)
  nonVeganProduct: Product = new Product();

  @JsonProperty('pleagan', Pleagan, true)
  pleagan?: Pleagan = new Pleagan();

  @JsonProperty('supports', [Support], true)
  supports?: Support[] = [];

  @JsonProperty('veganProduct', Product, true)
  veganProduct?: Product = new Product();
}
