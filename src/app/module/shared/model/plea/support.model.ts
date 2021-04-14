import { ISupport } from 'pleagan-model/dist/model/plea/base/support.interface';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Pleagan } from '../pleagan/pleagan.model';
import { DateConverter } from '@core/service/json-convert/date.converter';

@JsonObject( 'Support' )
export class Support implements ISupport {
  @JsonProperty('id', Number )
  id = 0;

  @JsonProperty('comment', String )
  comment = '';

  @JsonProperty('pleagan', Pleagan, true )
  pleagan = new Pleagan();

  @JsonProperty('createdAt', DateConverter )
  createdAt = new Date();

  @JsonProperty('updatedAt', DateConverter )
  updatedAt = new Date();
}
