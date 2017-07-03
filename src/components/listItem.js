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
  Dimensions
} from "react-native";
import { Card,Text } from 'react-native-elements';


export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finish: false
    };
  }

  render() {
    const screenWidth = Dimensions.get("window").width - 10;
    let imageUri = this.props.article.LandscapeAvatar;
    let onSelected = this.props.onSelected

    if (imageUri == null || imageUri == "") {
      imageUri = "http://rscmireland.com/news/News.jpg";
    }

    return (
      <Card containerStyle={{padding: 1}}>
        <TouchableNativeFeedback
          onPress={() => onSelected(this.props.index)}
          background={
            Platform.OS === "android"
              ? TouchableNativeFeedback.SelectableBackground()
              : ""
          }
        >
          <View style={{ flex: 1, flexDirection: "column" ,height: 200}}>
            <Image
              source={{ uri: imageUri }}
              style={{ flex: 1, width: screenWidth }}
            />
            <View style={{padding:5}}>
                 <Text h4> 
              {this.props.article.Title} {this.props.index}
            </Text>


            </View>
         
          </View>
        </TouchableNativeFeedback>
      </Card>
    );
  }
}
