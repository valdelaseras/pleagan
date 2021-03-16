export class HttpLoadingWrapper<T> {
  status: HTTP_LOADING_STATUS;
  value?: T;

  constructor( value?: T ) {
    if ( value !== undefined) {
      this.value = value;
      this.status = HTTP_LOADING_STATUS.FINISHED;
    } else {
      this.status = HTTP_LOADING_STATUS.LOADING;
    }
  }
}

export enum HTTP_LOADING_STATUS {
  LOADING, FINISHED
}
