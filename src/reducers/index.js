import { combineReducers } from "redux";
import { NavigationActions } from "react-navigation";

import { AppNavigator } from "../navigators/AppNavigator";
import { article, category } from "./article";
import { values } from "./values";
import { firebaseStateReducer } from 'react-redux-firebase'

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams("Home");
const secondAction = AppNavigator.router.getActionForPathAndParams("List");
const nav = (state, action) => {
	switch (action.type) {
		case "GO_BACK": {
			return AppNavigator.router.getStateForAction(
				NavigationActions.back(),
				state
			);
		}
	}
	return AppNavigator.router.getStateForAction(action, state);
};

const AppReducer = combineReducers({
	firebase: firebaseStateReducer,

	nav,
	article,
	values
});

export default AppReducer;
