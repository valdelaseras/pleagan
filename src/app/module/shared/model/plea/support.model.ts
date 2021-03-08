import { ISupport } from 'pleagan-model/dist/model/plea/base/support.interfase';
import { JsonObject, JsonProperty } from 'json2typescript';
import { Pleagan } from '../pleagan/pleagan.model';

@JsonObject('Support')
export class Support implements ISupport {
  @JsonProperty('id', Number)
  id = 0;

  @JsonProperty('comment', String)
  comment = '';

  @JsonProperty('pleagan', Pleagan, true)
  pleagan = new Pleagan();

  @JsonProperty('createdAt', String)
  createdAt = new Date();

  @JsonProperty('updatedAt', String)
  updatedAt = new Date();
}
