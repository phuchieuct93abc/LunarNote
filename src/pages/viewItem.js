import React from 'react';
import {TouchableNativeFeedback,Platform,ActivityIndicator,Alert, Image, Text, View,Button,FlatList,Dimensions } from 'react-native';

export  default class ViewItem extends React.Component {
  constructor(props){
    super(props);


  }
 
 componentDidMount() {
         

  }
  render() {
     const article = this.props.navigation.params.article
    if({article} ==null){
      return <View style={{flex: 1}}>
            <ActivityIndicator />
            </View>


    }
   

      return (
        <View>
              <Text>{article.Description}</Text>  
        </View>

       
      );
    
     

  }
}

