import { IsLoggedIn } from './is-logged-in';
import { IsNotLoggedIn } from './is-not-logged-in';

export const routeGuards = [
  IsLoggedIn,
  IsNotLoggedIn,
];

export * from './is-logged-in';
export * from './is-not-logged-in';
