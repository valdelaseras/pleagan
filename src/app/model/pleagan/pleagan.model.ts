import { IPleagan } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';
import { IUserSettings } from 'pleagan-model/dist/model/pleagan/settings/user-settings.interface';

@JsonObject('Pleagan')
export class Pleagan implements IPleagan {
  @JsonProperty('uid', String)
  uid: string = '';

  @JsonProperty('emailVerified', Boolean)
  emailVerified: boolean = false;

  @JsonProperty('displayName', String)
  displayName: string = '';

  @JsonProperty('email', String, true)
  email?: string = '';

  @JsonProperty('photoUrl', String, true)
  photoUrl?: string = '';

  @JsonProperty('country', String, true)
  country?: string = '';

  settings: IUserSettings;
}
