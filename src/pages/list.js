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

  }




  render() {

   

    return (
      <View style={{ flex: 1 }}>
       
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
  
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
   
  };
};

const ListScreen = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListScreen;
