import { Injectable } from '@angular/core';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

@Injectable({
  providedIn: 'root',
})
export class JsonConvertService<T> extends JsonConvert {
  constructor() {
    super();
    // this.operationMode = OperationMode.LOGGING;
    this.ignorePrimitiveChecks = false;
    this.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
  }

  parseArray(input: object[], type: new () => T): T[] {
    try {
      return this.deserializeArray<T>(input, type);
    } catch ( error ) {
      console.error( error );
      return [] as T[];
    }
  }

  parse(input: object, type: new () => T): T {
    try {
      return this.deserializeObject<T>(input, type);
    } catch ( error ) {
      console.error( error );
      return null as unknown as T;
    }
  }
}
