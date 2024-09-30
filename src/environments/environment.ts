// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from '../app/models/environment-configuration';

const serverUrl = 'https://uatbe.softwaves.co';

// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile: 'user-profiles',
  },
  adConfig: {
    clientId: 'b66930e8-db93-498e-a9c4-9642c14a4085',
    readScopeUrl: 'api://8155e346-1c03-4281-9510-b64cac9e0e8c/Read',
    writeScopeUrl: 'api://8155e346-1c03-4281-9510-b64cac9e0e8c/Write',
    scopeUrls: [
      'api://8155e346-1c03-4281-9510-b64cac9e0e8c/Read',
      'api://8155e346-1c03-4281-9510-b64cac9e0e8c/Write',
    ],
    apiEndpointUrl: 'https://uatbe.softwaves.co',
    tenantId: '1bf381f3-ed19-4473-97a5-5da0aeba5b6f',
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
