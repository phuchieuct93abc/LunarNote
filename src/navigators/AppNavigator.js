import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';

import HomeScreen from '../pages/home'
import List from '../pages/list'

export const AppNavigator   = TabNavigator({
  Home: { screen: HomeScreen } ,//Default entry screen
  List: { screen: List }, //Default entry screen
});

const AppWithNavigationState = ({ dispatch, nav,state }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav,reduxState: state })} />
);



const mapStateToProps = state => ({
  nav: state.nav,
  state:state
});

export default connect(mapStateToProps)(AppWithNavigationState);
