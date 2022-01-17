import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject( 'GetNotificationSettingsDto' )
export class GetNotificationSettingsDto {
  @JsonProperty('myPleas', Boolean )
  myPleas: boolean;

  @JsonProperty('supportedPleas', Boolean )
  supportedPleas: boolean;

  @JsonProperty('news', Boolean )
  news: boolean;
}
