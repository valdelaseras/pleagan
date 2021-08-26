export class CreateDeviceDto {
  token: string;
  uuid: string;

  constructor( token: string, uuid: string ) {
    this.token = token;
    this.uuid = uuid;
  }
}
