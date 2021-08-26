import { JsonObject, JsonProperty } from 'json2typescript';
import { GetDeviceDto } from '../device/get-device.dto';
import { GetUserSettingsDto } from './get-user-settings.dto';

@JsonObject('GetCurrentPleaganDto')
export class GetCurrentPleaganDto {
  @JsonProperty('uid', String )
  uid: string = '';

  @JsonProperty('displayName', String )
  displayName: string = '';

  @JsonProperty('photoURL', String, true )
  photoURL?: string = '';

  @JsonProperty('country', String, true )
  country?: string = '';

  @JsonProperty('devices', () => [ GetDeviceDto ] )
  devices: GetDeviceDto[] = [];

  @JsonProperty('settings', GetUserSettingsDto, true )
  settings: GetUserSettingsDto = new GetUserSettingsDto();
}
