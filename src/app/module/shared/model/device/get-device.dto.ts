import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject( 'GetDeviceDto' )
export class GetDeviceDto {
  @JsonProperty('token', String )
  token: string;

  @JsonProperty('uuid', String )
  uuid: string;

  @JsonProperty( 'notifyOnMyPleas', Boolean )
  notifyOnMyPleas: boolean;

  @JsonProperty( 'notifyOnSupportedPleas', Boolean )
  notifyOnSupportedPleas: boolean;

  @JsonProperty( 'notifyOnNews', Boolean )
  notifyOnNews: boolean;
}
