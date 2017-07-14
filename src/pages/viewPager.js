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
import {openBottomSheet} from '../actions'
import {
  fetchArticleList,
  loadMore,
  resetArticle,
  selectArticle
} from "../actions";
import Modal from 'react-native-modalbox';

import { ViewPager } from "rn-viewpager";
import {BottomSheetBehavior,CoordinatorLayout} from "react-native-bottom-sheet-behavior"
//https://github.com/maxs15/react-native-modalbox
var self;

class ViewPagerArticle extends React.Component {
  constructor(props) {
    super(props);
    this.openSetting = this.openSetting.bind(this);
    self = this;
  }
  openSetting(){
    this.bottomSheet.setBottomSheetState(BottomSheetBehavior.STATE_EXPANDED)
  }

static navigationOptions = ({ navigation }) => {
  this.onClickRightButton = ()=>{
navigation.dispatch(openBottomSheet())


  }
  return {
   title: `Chat with hieu`,
   headerRight: <Button onPress={this.onClickRightButton} title="seting"></Button>,
 }};


  _onChangePage(data) {
    let self = this;
            let position = data.position

       this.props.selectArticle(position)

      if (position == self.props.articleList.length - 1) {
        self.props.getMoreArticle();
      }

  }


  render() {


    return (

        <View style={{ flex: 1 }}>
          <Modal isOpen={this.props.isOpenBottomSheet} position="bottom" backdrop={false} style={{height:200}}>
            <Text style={styles.text}>Basic modal</Text>
          </Modal>
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

              return (<View style={{ flex: 1,}} key={item.ContentID}>
                <ViewItem style={{ flex: 1, backgroundColor: 'red' }} article={item}></ViewItem>
              </View>)

          })}
         </ViewPager>
        </View>

    );
  }
}
const styles = StyleSheet.create({
  show:{
    padding: 26
  },
  hide:{
    display:'none'

  }
})
const mapStateToProps = state => {
  return {
    articleList: state.article,
    selectedIndex: state.values.selectedArticleIndex,
    isOpenBottomSheet:state.values.isOpenBottomSheet
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
