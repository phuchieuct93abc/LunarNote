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
import ViewItem from "../components/viewItem";
import { connect } from "react-redux";
import { fetchArticleList, loadMore, resetArticle } from "../actions";
 class ViewPager extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      index:parseInt(this.props.selectedIndex)
    }

  }
  _onPageSelected(event) {
    var self = this;
    var position  = event.nativeEvent.position 
    setTimeout(function(){
    if(position>=self.props.articleList.length-2){
      self.props.getMoreArticle()
    }
    self.setState({ index: parseInt(position) });
    },1000)
   
  }

  render() {
    let articleList =  this.props.articleList;
    console.log(articleList.length-1,articleList[articleList.length-1])
    if (this.state.index != null)
      return (
        <View style={{ flex: 1 }}>
        <Text>{this.state.index} /{this.props.articleList.length}</Text>
          <ViewPagerAndroid
            style={{ flex: 1 }}
            initialPage={this.state.index}
            onPageSelected={this._onPageSelected.bind(this)}
          >
            { 
            articleList.map((item, mapIndex) => {
  
              return (
                <View key={mapIndex}>
                  {mapIndex >= this.state.index - 1 &&
                  mapIndex <= this.state.index + 1
                    ? <ViewItem article={item} />
                    : <Text>Loading...</Text>}
                </View>
              );
            })}
          </ViewPagerAndroid>
        </View>
      );
  }
}
const mapStateToProps = state => {
  return {
       articleList: state.article,
       selectedIndex:    state.values.selectedArticleIndex


  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {

    getMoreArticle: id => {
      dispatch(loadMore());
    },
  
  };
};

const ViewPagerScreen = connect(mapStateToProps, mapDispatchToProps)(ViewPager);

export default ViewPagerScreen;
