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
  StyleSheet
} from "react-native";
import { Card, Text } from "react-native-elements";
import Shimmer from 'react-native-shimmer';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finish: false
    };
  }

  render() {
    const loadingText = <Shimmer duration={2000} style={styles.flex}><Text  style={styles.loadingText}>Loading...</Text></Shimmer>
    const screenWidth = Dimensions.get("window").width - 10;
    let imageUri = this.props.article.LandscapeAvatar;
    let onSelected = this.props.onSelected;
    let background =
      Platform.OS === "android"
        ? TouchableNativeFeedback.SelectableBackground()
        : "";

    if (imageUri == null || imageUri == "") {
      imageUri = "http://rscmireland.com/news/News.jpg";
    }
    let isLoading = this.props.article.isLoading;
    let imagePlaceHolder
   imagePlaceHolder =  isLoading?loadingText:<Image
              source={{ uri: imageUri }}
              style={{ flex: 1 }}
            />
    
    return (
      <Card containerStyle={styles.container}>
        <TouchableNativeFeedback
          onPress={() => onSelected(this.props.index)}
          background={background}
        >
          <View style={{ flex: 1, flexDirection: "column", height: 200 }}>
            {imagePlaceHolder}
            <View style={{ padding: 5 }}>
              <Text h4>
                {this.props.article.Title} {isLoading}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </Card>
    );
  }
}
 const styles = StyleSheet.create({
      flex: {
        flex:1
      
      },
      container:{
        flex:1,
        padding:0,
        margin:0,
        marginBottom:10
      },
      loadingText:{
        fontSize:30,
        flex:1
      }
   });
