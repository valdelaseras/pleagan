import { AuthService } from './auth/auth.service';
import { CompanyService } from './company/company.service';
import { DisplayMessageService } from './display-message/display-message.service';
import { FirebaseStorageService } from './firebase-storage/firebase-storage.service';
import { JsonConvertService } from './json-convert/json-convert.service';
import { LoadingIndicatorService } from './loading-indicator/loading-indicator.service';
import { PleaService } from './plea/plea.service';
import { PleaganService } from './pleagan/pleagan.service';
import { ProductService } from './product/product.service';

export const services = [
  AuthService,
  CompanyService,
  DisplayMessageService,
  FirebaseStorageService,
  JsonConvertService,
  LoadingIndicatorService,
  PleaService,
  PleaganService,
  ProductService,
];

export * from './auth/auth.service';
export * from './company/company.service';
export * from './display-message/display-message.service';
export * from './firebase-storage/firebase-storage.service';
export * from './json-convert/json-convert.service';
export * from './loading-indicator/loading-indicator.service';
export * from './plea/plea.service';
export * from './pleagan/pleagan.service';
export * from './product/product.service';
