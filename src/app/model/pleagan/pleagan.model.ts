import { IPleagan } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Pleagan')
export class Pleagan implements IPleagan {
  @JsonProperty('uid', String)
  uid: string = '';

  @JsonProperty( 'emailVerified', Boolean )
  emailVerified: boolean = false;

  @JsonProperty( 'photoUrl', String )
  photoUrl: string = '';

  @JsonProperty('displayName', String)
  displayName: string = '';

  @JsonProperty('email', String)
  email: string = '';

  @JsonProperty('country', String)
  country?: string = '';
}
