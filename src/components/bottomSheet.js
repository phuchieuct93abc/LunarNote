import React from "react";
import {
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
  View,
  Button,
  FlatList,
  Dimensions,
  StyleSheet,
  Slider,
  Switch,
  Linking,
  Picker,
  Share
} from "react-native";
import { Card, Text, ButtonGroup } from "react-native-elements";
import { connect } from "react-redux";
import { changeNightMode, changeFontSize } from "../actions";

class BottomSheet extends React.Component {
  openSource() {
    Linking.openURL(this.props.selectedArticle.ContentUrl);
  }
  share() {
    let selectedArticle = this.props.articles[this.props.selectedArticleIndex];
    Share.share(
      {
        message: selectedArticle.ContentUrl,
        title: "Share url"
      },
      {
        dialogTitle: "Share url"
      }
    );
  }

  render() {
    const buttons = ["Small", "Medium", "Large"];

    return (
      <View style={[styles.flex, styles.wrapper, { flexDirection: "column",paddingBottom:5 }]}>
        <View style={{ flex: 2 , flexDirection: "column",paddingBottom:10 }}> 
          <View
            style={[
              {
                alignItems: "center",
                justifyContent: "flex-start",
                flex: 1,
                flexDirection: "row"
              }
            ]}
          >
            <Text style={{ flex: 1 }}>
              Font size: {this.props.fontSize}
            </Text>
            <ButtonGroup
              onPress={this.props.changeFontSize}
              selectedIndex={this.props.fontSize}
              buttons={buttons}
              containerStyle={{ flex: 1, height: 30 }}
            />
          </View>

          <View
            style={[
              {
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                flexDirection: "row"
              }
            ]}
          >
            <Text style={{ flex: 1 }}>Night mode:</Text>
            <View style={{ alignItems: "flex-start", flex: 1 }}>
              <Switch
                value={this.props.isNightMode}
                onValueChange={this.props.changeNightMode}
              />
            </View>
          </View>
          
        </View>

        <View style={{ flex: 1,flexDirection:"row" }}> 
        <View style={styles.buttonGroup}>
         <Button onPress={this.share.bind(this)} title="Share" />
        </View>
        <View style={styles.buttonGroup}>
            <Button 
            onPress={this.openSource.bind(this)}
            title="Open original source"
          />
        </View>
         

      
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  let selectedArticle = state.article[state.values.selectedArticleIndex];
  return {
    isNightMode: state.values.nightMode,
    selectedArticle: selectedArticle,
    fontSize: parseInt(state.values.fontSize),
    selectedArticleIndex: state.values.selectedArticleIndex,
    articles: state.article
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeNightMode: value => {
      dispatch(changeNightMode());
    },
    changeFontSize: value => {
      dispatch(changeFontSize(value));
    }
  };
};
const BottomSheetScreen = connect(mapStateToProps, mapDispatchToProps)(
  BottomSheet
);
export default BottomSheetScreen;

const styles = StyleSheet.create({
  flexColumn: {
    flex: 1,
    flexDirection: "row"
  },
  flex: {
    flex: 1
  },
  wrapper: {
    padding: 10
  },
  buttonGroup:{
    paddingLeft:5,
    paddingRight:5,
    flex:1
  }
});
