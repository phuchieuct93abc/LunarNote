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
import Swiper from 'react-native-swiper';
import ViewPager from 'react-native-viewpager'
import ViewItem from "../components/viewItem";
import { connect } from "react-redux";
import { fetchArticleList, loadMore, resetArticle } from "../actions";

 class ViewPagerArticle extends React.Component {
  constructor(props) {
    super(props);

     this.state={
      index:parseInt(this.props.selectedIndex),
      articleList:this.props.articleList 
    }


  }




  componentWillUpdate(){
/*    console.log(this.props.articleList.length)

     this.setState({
      articleList:this.props.articleList 
    })*/
  }
  _onPageSelected(event) {
    
   
  }
  componentDidUpdate(){

    var position  = this.state.index
    if(position>=this.props.articleList.length-2){
      this.props.getMoreArticle()
    }

  } 



 _onMomentumScrollEnd(e, state, context) {
      var position  = state.index 
    if(position>=this.props.articleList.length-2){
      this.props.getMoreArticle()
    }
       this.setState({ index: parseInt(position) });

  }
  /*getListView(){
              console.log(this.props.articleList.length)
            let views = this.props.articleList.map((item, mapIndex) => {
              return (
             
              );
            })
            console.log(views.length)
            return views

  }*/
  _onChangePage(data){
 if(data>=this.props.articleList.length-2){
           this.props.getMoreArticle()

  }
}

  _renderPage(item)  {
    return (
        <View key={item.ContentID} style={{flex:1}}>
                    <ViewItem article={item} />
                    
                </View>
    );
  }
  render()  {

      let  dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
          });

      return (
        <View style={{ flex: 1 }}>
        <Text>{this.state.index} /{this.props.articleList.length}</Text>
        <ViewPager

        dataSource={dataSource.cloneWithPages(this.props.articleList)}
        renderPage={this._renderPage}
        onChangePage={this._onChangePage.bind(this)}

>
          


        </ViewPager>

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

const ViewPagerScreen = connect(mapStateToProps, mapDispatchToProps)(ViewPagerArticle);

export default ViewPagerScreen;
