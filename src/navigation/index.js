/**
 * App Navigation
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import { Actions, Scene, ActionConst } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';

// Components
import Drawer from '@containers/ui/DrawerContainer';

// Scenes
import AppLaunch from '@containers/Launch/LaunchView';
import AuthenticateView from '@containers/auth/AuthenticateView';
import mainView from '@containers/main/mainView'
/* Routes ==================================================================== */
export default Actions.create(
  <Scene key={'root'} {...AppConfig.navbarProps}>
<Scene hideNavBar component={AppLaunch} key="launch"/>

<Scene hideNavBar component={AuthenticateView} key="authenticate"/>

 <Scene
      hideNavBar
      key={'main'}
      component={mainView}
      analyticsDesc={'AppLaunch: Launching App'}
    />

  </Scene>, 
);
