// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {name, version} from 'package.json';

export const environment = {
  production: false,
  apiUrl: 'https://run.mocky.io/v3/45b53905-0e8f-4e37-b19a-feaf8e29c6bb'
};

/**
 * App version from package.json
 */
export const PROJECT_VERSION = version;

/**
 * App name from package.json
 */
export const PROJECT_NAME = name;

/**
 * The notification server public key for push notifications
 */
export const NOTIFICATION_SERVER_PUBLIC_KEY = '';

/**
 * Set to true for error dialogs to be shown
 */
export const DEBUG_DIALOGS = false;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
