import React from 'react';
import {TouchableNativeFeedback,Platform,ActivityIndicator,Alert, Image, Text, View,Button,FlatList,Dimensions } from 'react-native';

export default  class ListItem extends React.Component {

  constructor(props){
    super(props)
    this.state={
      finish:false
    }

  }


  render() {
    const screenWidth = Dimensions.get('window').width - 10 
    const { navigate } = this.props.navigate;

   

      return (
        <View>
        <TouchableNativeFeedback 
            onPress={() => navigate("ViewItem",{article:this.props.article})}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
           <View style={{flex:1,flexDirection:"column"}}>

            <Image source={{uri: this.props.article.LandscapeAvatar}} 
             style={{flex:3,width:screenWidth,height:100}} />
            <Text style={{flex:1}} >{this.props.article.Title}</Text>  
          </View>
        </TouchableNativeFeedback>
        </View>

       
      );
    
     

  }
}

