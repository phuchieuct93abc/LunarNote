import React from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator,
  Image,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  ScrollView,
  ViewPagerAndroid,
  Alert
} from "react-native";
import ViewItem from "./viewItem";

export default class ViewPager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: parseInt(this.props.navigation.state.params.index)
    };
  }
  _onPageSelected(event) {
    this.setState({ index: parseInt(event.nativeEvent.position) });
  }

  render() {
    this.articleList = this.props.navigation.state.params.articleList;

    if (this.state.index != null)
      return (
        <View style={{ flex: 1 }}>
          <ViewPagerAndroid
            style={{ flex: 1 }}
            initialPage={this.state.index}
            onPageSelected={this._onPageSelected.bind(this)}
          >
            {this.articleList.map((item, mapIndex) => {
              return (
                <View key={item.ContentID}>
                  {mapIndex >= this.state.index - 1 &&
                  mapIndex <= this.state.index + 1
                    ? <ViewItem article={item} />
                    : <Text>bbb</Text>}
                </View>
              );
            })}
          </ViewPagerAndroid>
        </View>
      );
  }
}
