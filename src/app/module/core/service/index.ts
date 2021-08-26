import { AuthService } from './auth/auth.service';
import { CompanyService } from './company/company.service';
import { NotificationService } from './notification/notification.service';
import { FirebaseStorageService } from './firebase-storage/firebase-storage.service';
import { JsonConvertService } from './json-convert/json-convert.service';
import { PleaService } from './plea/plea.service';
import { PleaganService } from './pleagan/pleagan.service';
import { ProductService } from './product/product.service';
import { CountryService } from './country/country.service';
import { DeviceService } from './device/device.service';

export const services = [
  AuthService,
  CompanyService,
  CountryService,
  DeviceService,
  NotificationService,
  FirebaseStorageService,
  JsonConvertService,
  PleaService,
  PleaganService,
  ProductService,
];

export * from './auth/auth.service';
export * from './company/company.service';
export * from './country/country.service';
export * from './device/device.service';
export * from './notification/notification.service';
export * from './firebase-storage/firebase-storage.service';
export * from './json-convert/json-convert.service';
export * from './plea/plea.service';
export * from './pleagan/pleagan.service';
export * from './product/product.service';
