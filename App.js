import React from 'react';
import HomePage from './pages/homepage';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{padding:20}}> 
        <HomePage></HomePage>

      </View>
    );
  }
}
