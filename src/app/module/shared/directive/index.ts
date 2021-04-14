import { ShowOnAuthDirective } from '@shared/directive/show-on-auth/show-on-auth.directive';
import { HideOnRoutesDirective } from '@shared/directive/hide-on-routes/hide-on-routes.directive';

export const directives = [
  ShowOnAuthDirective,
  HideOnRoutesDirective
];

export * from './show-on-auth/show-on-auth.directive';
export * from './hide-on-routes/hide-on-routes.directive';
