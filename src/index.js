/**
 * Index - this is where everything
 *  starts - but offloads to app.js
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
/* global __DEV__ */
import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Router } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles } from '@theme/';
import AppRoutes from '@navigation/';
import Analytics from '@lib/analytics';

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '@redux/index';
import * as firebase from 'firebase'
import {  reactReduxFirebase } from 'react-redux-firebase';
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'


// Connect RNRF with Redux
const RouterWithRedux = connect()(Router);

// Load middleware
let middleware = [
  Analytics,
  thunk, // Allows action creators to return functions (not just plain objects)
];

// if (__DEV__) {
//   // Dev-only middleware
//   middleware = [
//     ...middleware,
//     createLogger(), // Logs state changes to the dev console
//   ];
// }


const firebaseConfig = {
  apiKey: "AIzaSyDMGKJYnKpd4PB_j0x7NSCKYsn1goX_u2U",
  authDomain: "lunarnote-c03da.firebaseapp.com",
  databaseURL: "https://lunarnote-c03da.firebaseio.com",
  projectId: "lunarnote-c03da",
  storageBucket: "lunarnote-c03da.appspot.com",
  messagingSenderId: "491783415305"
};
firebase.initializeApp(firebaseConfig)
// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
  enableRedirectHandling: false // required 

}


const store = createStore(
  rootReducer,
  undefined,
  compose(
    reactReduxFirebase(firebase, config), // pass in firebase instance instead of config
    applyMiddleware(...middleware),
        autoRehydrate()

  )
)

persistStore(store, {blacklist: ['currentSudoku'],storage: AsyncStorage}, () => {
})
/* Component ==================================================================== */
// Wrap App in Redux provider (makes Redux available to all sub-components)
export default function AppContainer() {
  return (
    <Provider store={store}>
      <RouterWithRedux scenes={AppRoutes} style={AppStyles.appContainer} />
    </Provider>
  );
}
