// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * enviroment tests
 */
export const environment = {
  production: false,
  //apiUrl2: 'https://api.pv.wappvr-beta.com' // Producción
  //apiUrl2: 'https://api.test.pv.wappvr-beta.com' // Pruebas
  apiUrl2: 'https://api.dev.pv.wappvr-beta.com' // Desarollo
  ,
  //imageUrl: 'https://puntodeventa-assets.s3.amazonaws.com/prod/' // Produccion
  imageUrl: 'https://puntodeventa-assets.s3.amazonaws.com/dev/' // desarrollo
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.