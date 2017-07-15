import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';
import {article,category} from './article'
import {values} from './values'
// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const secondAction = AppNavigator.router.getActionForPathAndParams('List');
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction
);







const AppReducer = combineReducers({
  nav: (state, action) => (
    AppNavigator.router.getStateForAction(action, state)
  ),
  article,
  category,
  values
});

export default AppReducer;
