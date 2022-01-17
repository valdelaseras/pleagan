import { JsonObject, JsonProperty } from 'json2typescript';
import { GetMessageDto } from '../message/get-message.dto';

@JsonObject( 'GetInboxDto' )
export class GetInboxDto {
  @JsonProperty( 'id', Number )
  id: number;

  @JsonProperty( 'messages', () => [ GetMessageDto ] )
  messages: GetMessageDto[];
}
