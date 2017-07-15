import { AppRegistry,AsyncStorage } from "react-native";
import React from "react";
import { Provider } from "react-redux";

import { createStore,applyMiddleware ,compose } from "redux";

import AppReducer from "./src/reducers";
import AppWithNavigationState from "./src/navigators/AppNavigator";
import thunk from "redux-thunk";
import {persistStore, autoRehydrate} from 'redux-persist'

class App extends React.Component {

	render() {
			let store = createStore(AppReducer, compose(applyMiddleware(thunk),  autoRehydrate()));
			persistStore(store, {blacklist:['nav'],storage: AsyncStorage})

		return (
			<Provider store={store}>
				<AppWithNavigationState />
			</Provider>
		);
	}
}
AppRegistry.registerComponent("Reactnative", () => App);
