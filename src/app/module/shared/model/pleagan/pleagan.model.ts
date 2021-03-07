import { IPleagan } from 'pleagan-model';
import { JsonObject, JsonProperty } from 'json2typescript';
import { IUserSettings } from 'pleagan-model/dist/model/pleagan/settings/user-settings.interface';

@JsonObject('Pleagan')
export class Pleagan implements IPleagan {
  @JsonProperty('uid', String)
  uid: string = '';

  @JsonProperty('displayName', String)
  displayName: string = '';

  @JsonProperty('photoURL', String, true)
  photoURL?: string = '';

  @JsonProperty('country', String, true)
  country?: string = '';

  settings: IUserSettings;
}
