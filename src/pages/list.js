import React from "react";
import {
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  ListView,
  Text,
  View,
  Button,
  FlatList
} from "react-native";
import ListItem from "../components/listItem";
import { connect } from "react-redux";
import { fetchArticleList, loadMore, resetArticle,selectArticle,disableAllowToScrollToItem } from "../actions";
import { NavigationActions } from "react-navigation";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.props.disableAllowToScrollToItem()

    this._onSelectedArticle = this._onSelectedArticle.bind(this);
  }


  _loadArticleList() {
    this.props.fetchData(this.props.currentCategory);
  }
  componentDidMount() {
    this._loadArticleList();
    if(this.props.allowToScrollToItem){
      this.flatListRef.scrollToIndex({animated: true, index: "" + this.props.selectedArticleIndex});
      this.props.disableAllowToScrollToItem()
    }
  }
  _onRefresh() {
    this.props.resetArticleList();
    this._loadArticleList();
  }

  _getMore(info) {
    console.log(info)
    var self=this;

      if(self.props.articleList.length>0 && !self.props.isFetchingData && info.distanceFromEnd>=0){
            console.log("@@@@@@@@@@@@@@@@@@")
            self.props.getMoreArticle();

      }

  }

  _onSelectedArticle(index) {
    this.props.selectArticle(index)

  }
  componentDidUpdate() {
    if(this.props.allowToScrollToItem){
      this.flatListRef.scrollToIndex({animated: true, index: "" + this.props.selectedArticleIndex});
      this.props.disableAllowToScrollToItem()
    }
  }




  render() {
    const { params } = this.props.navigation.state;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    if (this.props.articleList.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Text>{this.props.articleList.length}</Text>
        <FlatList
          onEndReached={this._getMore.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoading}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          data={this.props.articleList}
          keyExtractor={(item,index)=>index}
          ref={(ref) => { this.flatListRef = ref; }}

          renderItem={(item) =>
              <ListItem
                article={item.item}
                onSelected={this._onSelectedArticle}
                index={item.index}
              />
            }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCategory: state.category.id,
    isLoading: false,
    articleList: state.article,
    currentIndex:state.values.currentIndex,
    selectedArticleIndex:state.values.selectedArticleIndex,
    allowToScrollToItem:state.values.allowToScrollToItem,
    isFetchingData:state.values.isFetchingData
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: id => {
      dispatch(fetchArticleList(id));
    },
    getMoreArticle: id => {
      dispatch(loadMore());
    },
    resetArticleList: () => {
      dispatch(resetArticle());
    },
    selectArticle:(index)=>{
      dispatch(selectArticle(index))
           dispatch(NavigationActions.navigate({ routeName: "ViewPager" }));

    },
    disableAllowToScrollToItem:()=>{
      dispatch(disableAllowToScrollToItem())

    }
  };
};

const ListScreen = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListScreen;
