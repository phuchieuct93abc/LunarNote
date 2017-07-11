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
import { fetchArticleList, loadMore, resetArticle,selectArticle } from "../actions";
import { NavigationActions } from "react-navigation";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this._onSelectedArticle = this._onSelectedArticle.bind(this);
  }

 
  _loadArticleList() {
    this.props.fetchData(this.props.currentCategory);
  }
  componentDidMount() {
    this._loadArticleList();
  }
  _onRefresh() {
    this.props.resetArticleList();
    this._loadArticleList();
  }

  _getMore() {
    
    if(this.props.articleList.length>0){
          this.props.getMoreArticle();

    }
  }

  _onSelectedArticle(index) {
    this.props.selectArticle(index)

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
        <ListView
          onEndReached={this._getMore.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoading}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={ds.cloneWithRows(this.props.articleList)}
          renderRow={(rowData, sec, index) =>
              <ListItem
                article={rowData}
                onSelected={this._onSelectedArticle}
                index={index}
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
    currentIndex:state.values.currentIndex
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

    }
  };
};

const ListScreen = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListScreen;
