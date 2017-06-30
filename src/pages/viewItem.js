import React from 'react';
import {TouchableNativeFeedback,Platform,ActivityIndicator,Alert, Image, Text, View,Button,FlatList,Dimensions,ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
export  default class ViewItem extends React.Component {

  constructor(props){
    super(props);
      this.article = this.props.navigation.state.params.article;
      this.state= {article:this.article}

  }
  updateImage(html){
            const screenWidth = Dimensions.get('window').width;
            console.log("@@@@@@@",screenWidth)
            var replace = "<img height='100000' width='10000000' ".replaceAll("{width}",screenWidth)    
 
          return html.replaceAll("<img",replace)


  }
  componentDidMount(){


     return fetch('http://dataprovider.touch.baomoi.com/json/article.aspx?articleId='+this.article.ContentID)
      .then((response) => response.json())
      .then((responseJson) => {
                  this.article.Content = this.updateImage(responseJson.article.Body) 

        this.setState(
            {article:this.article}
          )
        
      })
      .catch((error) => {
        console.error(error);   
      });


  }
 

  render() {
       return (

          <ScrollView>
          <View style={{flex:1}}>
           <HTMLView
              value={this.state.article.Content} 
            />
            </View>
          </ScrollView>

       
      );
    
     

  }
}

