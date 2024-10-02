// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from '../app/models/environment-configuration';

const serverUrl = 'https://oc.paymob.com';

// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile: 'user-profiles',
  },
  adConfig: {
    clientId: 'e98fd670-bf08-40af-a1cd-d4bf15b532cf',
    readScopeUrl: 'api://568ad5cb-038a-4157-a918-2a57dc508a72/Read',
    writeScopeUrl: 'api://568ad5cb-038a-4157-a918-2a57dc508a72/Write',
    scopeUrls: [
      'api://568ad5cb-038a-4157-a918-2a57dc508a72/Read',
      'api://568ad5cb-038a-4157-a918-2a57dc508a72/Write',
    ],
    apiEndpointUrl: 'https://oc.paymob.com',
    tenantId: '96bf2027-97ea-4dfc-8f5b-7121b770f292',
  },
  cacheTimeInMinutes: 15,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// run this app in 4200 port

/*
azure ad user credentials, it will not work after 15 days of I created, comment in channel to send you new one

karthik@learnsmartcodinggmail.onmicrosoft.com or kannan@learnsmartcodinggmail.onmicrosoft.com
LSCamu745406
*/
