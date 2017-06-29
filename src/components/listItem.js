import React from 'react';
import {ActivityIndicator, Image, Text, View,Button,FlatList,Dimensions } from 'react-native';

export default  class ListItem extends React.Component {

  constructor(props){
super(props)
this.state={
  finish:false
}

  }
  componentDidMount() {
/*
    Image.getSize(this.props.article.LandscapeAvatar, (width, height) => {
      // calculate image width and height 
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      this.setState({imgWidth: screenWidth, imgHeight: 100,finish:true})
    })*/
  }


  render() {
          const screenWidth = Dimensions.get('window').width - 10 

   

      return (
        <View style={{flex:1,flexDirection:"column"}}>
          <Image source={{uri: this.props.article.LandscapeAvatar}} 
           style={{flex:3,width:screenWidth,height:100}} />
          <Text style={{flex:1}} >{this.props.article.Title}</Text> 
        </View>
      );
    
     

  }
}

