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
  Switch,Linking,Picker
} from "react-native";
import { Card, Text } from "react-native-elements";
import { connect } from "react-redux";
import {changeNightMode,changeFontSize} from "../actions"
class BottomSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finish: false
    };
  }
  openSource(){
    Linking.openURL(this.props.selectedArticle.ContentUrl)
  }

  render() {

    return (
      <View style={[styles.flex,styles.wrapper]}>
        <View style={{height:20}}>
          <View style={styles.flexColumn}>
            <Text>Font size {this.props.fontSize}</Text>
            <Slider value={this.props.fontSize} style={{width:150}} maximumValue={3} minimumValue={1} step={1} onValueChange={this.props.changeFontSize}/>

          </View>

        </View>
        <View style={{height:20}}>
          <View style={styles.flexColumn}>
            <Text>Night mode</Text>
            <Switch value={this.props.isNightMode} onValueChange={this.props.changeNightMode}/>
          </View>

        </View>




        <View style={{flex:1,justifyContent:"center"}}>
          <Button onPress={this.openSource.bind(this)} title="Open original source"></Button>
        </View>


      </View>
    );
  }
}
const mapStateToProps = state => {
  let selectedArticle = state.article[state.values.selectedArticleIndex]
  return {
    isNightMode: state.values.nightMode,
    selectedArticle:selectedArticle,
    fontSize:parseInt(state.values.fontSize)
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  changeNightMode:(value)=>{
    dispatch(changeNightMode())
  },
  changeFontSize:(value)=>{
    dispatch(changeFontSize(value))

  }

  };
};
const BottomSheetScreen = connect(mapStateToProps, mapDispatchToProps)(BottomSheet);
export default BottomSheetScreen;

 const styles = StyleSheet.create({
   flexColumn:{
     flex:1,
     flexDirection:"row"
   },
   flex:{
     flex:1
   },
   wrapper:{
     padding:10
   }
});
