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
    this.articleList = this.props.navigation.state.params.articleList.slice(0,5)
  
    this.index = parseInt(this.props.navigation.state.params.index)
  }

  render() {
  
   
    var listView = this.articleList.map(item => {
      return (
        <View key={item.ContentID}>
          <ViewItem article={item}></ViewItem>
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <ViewPagerAndroid style={{ flex: 1 }} initialPage={this.index}>
         {listView}
        </ViewPagerAndroid>
      </View>
    );
  }
}
