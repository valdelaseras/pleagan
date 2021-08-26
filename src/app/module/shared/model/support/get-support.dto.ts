import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from '@core/service/json-convert/date.converter';
import { GetPleaganDto } from '../pleagan/get-pleagan.dto';

@JsonObject( 'GetSupportDto' )
export class GetSupportDto {
  @JsonProperty('id', Number )
  id = 0;

  @JsonProperty('comment', String )
  comment = '';

  @JsonProperty('pleagan', () => GetPleaganDto )
  pleagan = new GetPleaganDto();

  @JsonProperty('createdAt', DateConverter )
  createdAt = new Date();

  @JsonProperty('updatedAt', DateConverter )
  updatedAt = new Date();
}
