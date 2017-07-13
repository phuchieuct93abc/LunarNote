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
import ViewPager from "react-native-viewpager";
import ViewItem from "../components/viewItem";
import { connect } from "react-redux";
import { fetchArticleList, loadMore, resetArticle ,selectArticle} from "../actions";

class ViewPagerArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: parseInt(this.props.selectedIndex),
      articleList: this.props.articleList
    };
  }


  _onChangePage(data) {
    this.props.selectArticle(data)
    if (data >= this.props.articleList.length - 2) {
      this.props.getMoreArticle();
    }
  }

  _renderPage(item,data) {
    if(data < this.props.selectedIndex-1 || data > this.props.selectedIndex+1){
      return (<View key={data} style={{ flex: 1 }}><Text>Loading</Text></View>)
    }else{

      return (
        <View key={data} style={{ flex: 1 }}>
          <ViewItem article={item}  load={data==this.props.selectedIndex}/>
        </View>
      );

    }



 
  }
  render() {
    let dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1.ContentID !== p2.ContentID
    });

    return (
      <View style={{ flex: 1 }}>
      
        <ViewPager
          initialPage={parseInt(this.props.selectedIndex)}
          dataSource={dataSource.cloneWithPages(this.props.articleList)}
          renderPage={this._renderPage.bind(this)}
          onChangePage={this._onChangePage.bind(this)}
          renderPageIndicator={false}
        />
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
     selectArticle:(index)=>{
      dispatch(selectArticle(index))

    }
  };
};

const ViewPagerScreen = connect(mapStateToProps, mapDispatchToProps)(
  ViewPagerArticle
);

export default ViewPagerScreen;
