import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('GetPleaganDto')
export class GetPleaganDto {
  @JsonProperty('displayName', String )
  displayName: string = '';

  @JsonProperty('uid', String, true )
  uid?: string = '';

  @JsonProperty('photoURL', String, true )
  photoURL?: string = '';

  @JsonProperty('country', String, true )
  country?: string = '';
}
