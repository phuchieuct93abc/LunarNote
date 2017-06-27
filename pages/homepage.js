import React from 'react';
import { StyleSheet, Text, View,Button,FlatList } from 'react-native';

export default  class HomePage extends React.Component {


  render() {
    return (
      <View>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'}, 
          ]}
          renderItem={({item}) => <Button style={{margin:10}} title={item.key}></Button>}
        />      
      </View>
    );
  }
}

