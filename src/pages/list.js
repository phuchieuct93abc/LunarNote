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


export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    currentIndex = 0;
    this._firstLoad = this._firstLoad.bind(this);
    this._onSelectedArticle = this._onSelectedArticle.bind(this)
  }

  async _fetchData(from) {
    let url =
      "http://dataprovider.touch.baomoi.com/json/articlelist.aspx?start=${from}&count=10&listType=zone&listId=53&imageMinSize=300&mode=quickview";
    url = url.replace("${from}", from);
    let response = await fetch(url);
    let responseJson = await response.json();
    currentIndex = currentIndex + 10;
    return responseJson.articlelist;
  }
  componentDidMount() {
    this.setState({ isLoading: true });

    this._firstLoad();
  }
  _onRefresh() {
    this.setState({ isLoading: true });
    this._firstLoad();
  }
  _firstLoad() {
    this._fetchData(0).then(response => {
      this.articles = response;
      this.ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.setState({
        isLoading: false,
        dataSource: this.ds.cloneWithRows(this.articles)
      });
    });
  }
  _getMore() {
    console.log("get more", currentIndex);
    this._fetchData(currentIndex).then(response => {
      this.articles = this.articles.concat(response);
      this.setState({
        dataSource: this.ds.cloneWithRows(this.articles)
      });
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.name}`
  });
  _onSelectedArticle(index){
    console.log("@@@@@@@@@@@@@@@",index)
    this.props.navigation.navigate("ViewPager", { index: index,articleList:this.articles })
  }

  render() {
    const { params } = this.props.navigation.state;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ListView
          onEndReachedThreshold={2000}
          onEndReached={this._getMore.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={(rowData,sex,index) => 
            <View style={{ padding:1 }}>
              <ListItem  article={rowData} onSelected={this._onSelectedArticle} index={index} />
            </View>}
        />
      </View>
    );
  }
}
