import { JsonObject, JsonProperty } from 'json2typescript';
import { THEME } from '../theme';
import { GetNotificationSettingsDto } from './get-notification-settings.dto';

@JsonObject( 'GetUserSettingsDto' )
export class GetUserSettingsDto {
  @JsonProperty('countryPrivate', Boolean )
  countryPrivate: boolean = true;

  @JsonProperty('email', () => GetNotificationSettingsDto )
  email: GetNotificationSettingsDto;

  @JsonProperty('theme', String )
  theme: THEME = THEME.DEFAULT;
}
