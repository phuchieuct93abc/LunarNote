import React from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  ScrollView,
  ViewPagerAndroid
} from "react-native";
import ViewItem from './viewItem'


export default class ViewPager extends React.Component {
  constructor(props) {
    super(props);
  
  }

  render() {
  
       this.articleList = this.props.navigation.state.params.articleList
    this.index = parseInt(this.props.navigation.state.params.index)

 

    return (
      <View style={{ flex: 1 }}>
      <Text>{ this.articleList[0].ContentID}</Text>
        <ViewPagerAndroid style={{ flex: 1 }} initialPage={this.index}>
        {
         
              this.articleList.map((item,mapIndex) => {



              return (
                <View key={item.ContentID}> 
                <Text>{item.ContentID}</Text>
                {mapIndex>=(this.index-1) && mapIndex<=(this.index+1)?(<ViewItem article={item}></ViewItem>):(<Text>aa</Text>)}
                
                </View>
                )
              
              
            



              })
 



        }

       
        </ViewPagerAndroid>
      </View>
    );
  }
}
