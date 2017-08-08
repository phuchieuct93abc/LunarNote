import { AppRegistry, AsyncStorage } from "react-native";
import React from "react";
import { Provider } from "react-redux";

import { createStore, applyMiddleware, compose } from "redux";

import AppReducer from "./src/reducers";
import AppWithNavigationState from "./src/navigators/AppNavigator";
import thunk from "redux-thunk";
import { persistStore, autoRehydrate } from 'redux-persist'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
class App extends React.Component {

	render() {
		const firebaseConfig = {
			apiKey: "AIzaSyDMGKJYnKpd4PB_j0x7NSCKYsn1goX_u2U",
			authDomain: "lunarnote-c03da.firebaseapp.com",
			databaseURL: "https://lunarnote-c03da.firebaseio.com",
			projectId: "lunarnote-c03da",
			storageBucket: "lunarnote-c03da.appspot.com",
			messagingSenderId: "491783415305"

		}
		firebase.initializeApp(firebaseConfig) // initialize firebase instance
		// react-redux-firebase options
		const config = {
			userProfile: 'users', // firebase root where user profiles are stored
			enableLogging: false, // enable/disable Firebase's database logging
			enableRedirectHandling: false
		}

		let store = createStore(AppReducer, undefined,
			compose(
				applyMiddleware(thunk.withExtraArgument(getFirebase)),
				reactReduxFirebase(firebase, config)
			));

		return (
			<Provider store={store}>
				<AppWithNavigationState />
			</Provider>
		);
	}
}
AppRegistry.registerComponent("Reactnative", () => App);
