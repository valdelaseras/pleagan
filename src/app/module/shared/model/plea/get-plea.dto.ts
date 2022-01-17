import { JsonObject, JsonProperty } from 'json2typescript';
import { PLEA_STATUS } from './plea-status.enum';
import { GetCompanyDto } from '../company/get-company.dto';
import { GetProductDto } from '../product/get-product.dto';
import { GetPleaganDto } from '../pleagan/get-pleagan.dto';
import { GetSupportDto } from '../support/get-support.dto';

@JsonObject( 'GetPleaDto' )
export class GetPleaDto {
  @JsonProperty('id', Number)
  id = 0;

  @JsonProperty('numberOfSupports', Number, true)
  numberOfSupports = 0;

  @JsonProperty('userHasSupported', Boolean, true)
  userHasSupported = false;

  @JsonProperty('status', String)
  status: PLEA_STATUS = PLEA_STATUS.UNNOTIFIED;

  @JsonProperty('description', String, true )
  description = '';

  @JsonProperty('createdAt', String)
  createdAt = new Date();

  @JsonProperty('company', GetCompanyDto )
  company: GetCompanyDto = new GetCompanyDto();

  @JsonProperty('nonVeganProduct', GetProductDto )
  nonVeganProduct: GetProductDto = new GetProductDto();

  @JsonProperty('pleagan', GetPleaganDto, true )
  pleagan?: GetPleaganDto = undefined;

  @JsonProperty('supports', [ GetSupportDto ], true)
  supports?: GetSupportDto[] = undefined;

  @JsonProperty('veganProduct', GetProductDto, true)
  veganProduct?: GetProductDto = undefined;
}
