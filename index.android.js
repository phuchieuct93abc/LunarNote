import { AppRegistry } from "react-native";
import React from "react";
import { Provider } from "react-redux";

import { createStore,applyMiddleware  } from "redux";

import AppReducer from "./src/reducers";
import AppWithNavigationState from "./src/navigators/AppNavigator";
import thunk from "redux-thunk";

class App extends React.Component {

	render() {
			let store = createStore(AppReducer, applyMiddleware(thunk)); 

		return (
			<Provider store={store}>
				<AppWithNavigationState />
			</Provider>
		);
	}
}
AppRegistry.registerComponent("Reactnative", () => App);