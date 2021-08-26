import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('GetMessageDto')
export class GetMessageDto {
  @JsonProperty( 'id', Number )
  id: number;

  @JsonProperty( 'createdAt', String )
  createdAt: string;

  @JsonProperty( 'opened', Boolean )
  opened: boolean;

  @JsonProperty( 'subject', String )
  subject: string;

  @JsonProperty( 'text', String )
  text: string;

  @JsonProperty( 'updatedAt', String )
  updatedAt: string;

  @JsonProperty( 'url', String, true )
  url?: string;
}
