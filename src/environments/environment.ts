// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyDWt1_1vmDfwxR6jCP1XI5V19DLbntiGXc',
    // authDomain: 'YOUR_AUTH_DOMAIN',
    // databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'pleagan-c27f2',
    // messagingSenderId: 'YOUR_SENDER_ID'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
