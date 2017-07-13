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
import {
  fetchArticleList,
  loadMore,
  resetArticle,
  selectArticle
} from "../actions";
import { ViewPager } from "rn-viewpager";

class ViewPagerArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: parseInt(this.props.selectedIndex),
      articleList: this.props.articleList
    };
  }

  _onChangePage(data) {
    let self = this;
            let position = data.position

       this.props.selectArticle(position)

    setTimeout(function(){
      if (position >= self.props.articleList.length - 2) {
        self.props.getMoreArticle();
      }

    },1000) 
  }

  _renderPage(item, data) {
    if (
      data < this.props.selectedIndex - 1 ||
      data > this.props.selectedIndex + 1
    ) {
      return (
        <View key={data} style={{ flex: 1 }}>
          <Text>Loading</Text>
        </View>
      );
    } else {
      return (
        <View key={data} style={{ flex: 1 }}>
          <ViewItem article={item} load={data == this.props.selectedIndex} />
        </View>
      );
    }
  }
  render() {


    return (
      <View style={{ flex: 1 }}>
      <Text>{this.props.selectedIndex}</Text>
      <Button title="load more" onPress={this.props.getMoreArticle}></Button>
       <ViewPager
        initialPage={parseInt(this.props.selectedIndex)}
        onPageSelected={this._onChangePage.bind(this)}
        style={{ flex: 1 }}
        key={this.props.articleList.length}

        >
     
                {this.props.articleList.map((item, index) => {
            if(index<this.props.selectedIndex-1 || index > this.props.selectedIndex.length+1){
                return (<View  style={{ flex: 1 }} key={item.ContentID}><Text >Loading</Text></View>);
 
            }

            return (<View style={{ flex: 1}} key={item.ContentID}><ViewItem style={{ flex: 1 }} article={item}></ViewItem></View>)

        })}


       </ViewPager>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    articleList: state.article,
    selectedIndex: state.values.selectedArticleIndex
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMoreArticle: id => {
      dispatch(loadMore());
    },
    selectArticle: index => {
      dispatch(selectArticle(index));
    }
  };
};

const ViewPagerScreen = connect(mapStateToProps, mapDispatchToProps)(
  ViewPagerArticle
);

export default ViewPagerScreen;
