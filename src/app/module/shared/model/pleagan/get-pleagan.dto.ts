import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('GetPleaganDto')
export class GetPleaganDto {
  @JsonProperty('uid', String )
  uid: string = '';

  @JsonProperty('displayName', String )
  displayName: string = '';

  @JsonProperty('photoURL', String, true )
  photoURL?: string = '';

  @JsonProperty('country', String, true )
  country?: string = '';
}
