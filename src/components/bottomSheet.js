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
  Picker
} from "react-native";
import { Card, Text } from "react-native-elements";
import { connect } from "react-redux";
import { changeNightMode, changeFontSize } from "../actions";
class BottomSheet extends React.Component {

  openSource() {
    Linking.openURL(this.props.selectedArticle.ContentUrl);
  }

  render() {
    return (
      <View style={[styles.flex, styles.wrapper, { flexDirection: "column" }]}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={[styles.flex]}>
            <View
              style={[
                styles.flexColumn,
                ,
                { alignItems: "center", justifyContent: "flex-start" }
              ]}
            >
              <Text style={{ flex: 0 }}>Font size:</Text>

              <Picker
                style={styles.flex}
                selectedValue={this.props.fontSize}
                onValueChange={this.props.changeFontSize}
              >
                <Picker.Item label="Small" value={1} />
                <Picker.Item label="Medium" value={2} />
                <Picker.Item label="Large" value={3} />
              </Picker>
            </View>
          </View>
          <View style={styles.flex}>
            <View
              style={[
                styles.flexColumn,
                ,
                { alignItems: "center", justifyContent: "flex-start" }
              ]}
            >
              <Text style={{ flex: 0 }}>Night mode:</Text>
              <Switch
                value={this.props.isNightMode}
                onValueChange={this.props.changeNightMode}
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            onPress={this.openSource.bind(this)}
            title="Open original source"
          />
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
    fontSize: parseInt(state.values.fontSize)
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
  }
});
