import { IPleagan } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject( 'Pleagan' )
export class Pleagan implements IPleagan {
  @JsonProperty( 'id', String )
  id: string = '';

  @JsonProperty( 'name', String )
  name: string = '';

  @JsonProperty( 'email', String )
  email: string = '';

  @JsonProperty( 'message', String )
  message?: string = undefined;

  @JsonProperty( 'location', String )
  location?: string = undefined;
}
