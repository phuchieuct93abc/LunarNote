import React from 'react';
import List from './src/pages/list'
import ViewPager from './src/pages/viewPager'
import HomeScreen from './src/pages/home'


import { Button } from 'react-native-elements';
import { StatusBar, AppRegistry,Text, View ,FlatList} from 'react-native';

import {  StackNavigator} from 'react-navigation'; 
const Color={
  button:"#2096F3"
}



const Navigator = StackNavigator({
  Home: { screen: HomeScreen }, //Default entry screen
  List: { screen: List }, //Default entry screen
  ViewPager:{screen:ViewPager}
});

export default Navigator 