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
  _renderNode(node, index, siblings, parent, defaultRenderer) {
    console.log(node.name)
     /* if (node.name == 'img') {
        const attribs = node.attribs;
            const screenWidth = Dimensions.get('window').width
            console.log(attribs.src)
        return (
              <Image key={index} source={{uri: attribs.src}} resizeMode="contain"
                 style={{ flex: 1}}  /> 
        ); 
      }*/
}



  componentDidMount(){


     return fetch('http://dataprovider.touch.baomoi.com/json/article.aspx?articleId='+this.article.ContentID)
      .then((response) => response.json())
      .then((responseJson) => {
                  this.article.Content = responseJson.article.Body

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
          <View style={{flex:1,padding:20}}>
           <HTMLView
              value={this.state.article.Content} 
              renderNode={this._renderNode} 
            />
            <Text>{this.state.article.Content} </Text>
            </View>
          </ScrollView>

       
      );
    
     

  }
}

