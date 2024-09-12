// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: 'AIzaSyBovcNnamKeiWBnDlyG7PR6PC1NHWBQSmU',
    authDomain: 'basketball-projekat.firebaseapp.com',
    databaseURL:
      'https://basketball-projekat-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'basketball-projekat',
    storageBucket: 'basketball-projekat.appspot.com',
    messagingSenderId: '236975429195',
    appId: '1:236975429195:web:10d7bfd28673cf05369fce',
  },
  firebaseRDBUrl:
    'https://console.firebase.google.com/u/0/project/basketball-projekat/database/basketball-projekat-default-rtdb/data/~2F',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
