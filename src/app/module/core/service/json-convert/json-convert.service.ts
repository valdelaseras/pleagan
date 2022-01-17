import { Injectable } from '@angular/core';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

@Injectable({
  providedIn: 'root',
})
export class JsonConvertService extends JsonConvert {
  constructor() {
    super();
    // this.operationMode = OperationMode.LOGGING;
    this.ignorePrimitiveChecks = false;
    this.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
  }

  parseArray<T>(input: object[], type: new () => T): T[] {
    return this.deserializeArray<T>(input, type);
  }

  parse<T>(input: object, type: new () => T): T {
    return this.deserializeObject<T>(input, type);
  }
}
