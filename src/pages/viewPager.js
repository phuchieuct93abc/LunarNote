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
  Alert,
  ListView
} from "react-native";
import Swiper from "react-native-swiper";
import ViewItem from "../components/viewItem";
import { connect } from "react-redux";
import { openBottomSheet, changeBottomSheet } from "../actions";
import {
  fetchArticleList,
  loadMore,
  resetArticle,
  selectArticle
} from "../actions";
import Modal from "react-native-modalbox";
import BottomSheetScreen from "../components/bottomSheet";
import Shimmer from 'react-native-shimmer';

import { ViewPager } from "rn-viewpager";
import { BottomSheetBehavior } from "react-native-bottom-sheet-behavior";

class ViewPagerArticle extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let sourceName =
      navigation.reduxState.article[
        navigation.reduxState.values.selectedArticleIndex
      ].SourceName;
    this.onClickRightButton = () => {
      navigation.dispatch(changeBottomSheet());
    };
    return {
      title: sourceName,
      headerRight: <Button onPress={this.onClickRightButton} title="seting" />
    };
  };
componentWillUpdate(nextProp){
  if(this.props.values != nextProp.values){
    this.props.navigation.setParams({}); //Update header title
  }


}
  _onChangePage(data) {
    let self = this;
    let position = data.position;
    //  this.props.navigation.setParams({}); //Update header title

    this.props.selectArticle(position);
    if (position >= self.props.articleList.length - 2) {
      setTimeout(function() {
        self.props.getMoreArticle();
      }, 500);
    }
  }
  onBack(){

    this.props.navigation.goBack()
  }

  render() {
    const loadingText = <Shimmer duration={2000} style={{flex:1}}><Text  style={{flex:1}}>Loading...</Text></Shimmer>

    return (
      <View style={{ flex: 1 }}>
        <Modal
          key={this.props.articleList.length + "_modal"}
          isOpen={this.props.isOpenBottomSheet}
          position="bottom"
          style={{ height: 120 }}
          backButtonClose={true}
          onClosed={this.props.closeBottomSheet}
        >
          <BottomSheetScreen />
        </Modal>
        <ViewPager
          initialPage={this.props.selectedIndex}
          onPageSelected={this._onChangePage.bind(this)}
          style={{ flex: 1 }}
          key={this.props.articleList.length}
          onBack={this.onBack.bind(this)}
        >
          {this.props.articleList.map((item, index) => {
            if (
              index < this.props.selectedIndex - 1 ||
              index > this.props.selectedIndex + 1 ||
              item.isLoading
            ) {
              return (
                <View style={{ flex: 1 }} key={index}>
              {loadingText}
                </View>
              );
            }

            return (
              <View style={{ flex: 1 }} key={index}>
                <ViewItem
                  style={{ flex: 1, backgroundColor: "red" }}
                  article={item}
                />
              </View>
            );
          })}
        </ViewPager>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  show: {
    padding: 26
  },
  hide: {
    display: "none"
  }
});
const mapStateToProps = state => {
  return {
    articleList: state.article,
    selectedIndex: parseInt(state.values.selectedArticleIndex),
    isOpenBottomSheet: state.values.isOpenBottomSheet,
    values:state.values
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMoreArticle: id => {
      dispatch(loadMore());
    },
    selectArticle: index => {
      dispatch(selectArticle(index));
    },
    closeBottomSheet: () => {
      dispatch(openBottomSheet(false));
    }
  };
};

const ViewPagerScreen = connect(mapStateToProps, mapDispatchToProps)(
  ViewPagerArticle
);

export default ViewPagerScreen;
