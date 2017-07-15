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
  Switch,Linking
} from "react-native";
import { Card, Text } from "react-native-elements";
import { connect } from "react-redux";
import {changeNightMode} from "../actions"
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
        <View style={styles.flexColumn}>
          <Text>Font size</Text>
          <Slider maximumValue={5} minimumValue={1} step={1} />
        </View>

        <View style={styles.flexColumn}>
          <Text>Night mode</Text>
          <Switch value={this.props.isNightMode} onValueChange={this.props.changeNightMode}/>
        </View>
        <View>
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
    selectedArticle:selectedArticle
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
changeNightMode:(value)=>{
  dispatch(changeNightMode())
},
openSource:()=>{

  dispatch()
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
