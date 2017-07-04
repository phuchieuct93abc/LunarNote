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
  Dimensions,Text
} from "react-native";
import VideoPlayer from "react-native-video-controls";


export default class CustomVideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadVideo: false };
  }

  render() {
    const screenWidth = Dimensions.get("window").width - 20;
    let posterUrl = this.props.poster;
    let videoUrl = this.props.video;
    if (this.state.loadVideo == true) {
      return (
        <VideoPlayer
          source={{ uri: videoUrl }} // Can be a URL or a local file.
          paused={true}
          style={{ flex: 1, width: screenWidth, height: 150 }}
        />
      );
    } else {
      return (
        <View style={{flex:1}}>
        <Text>Video : {posterUrl}</Text>
          
           <Image
            source={{ uri: posterUrl }}
            style={{ flex: 1, width: screenWidth ,height:200}}
          />
        </View>
       
        )
      
    }
  }
}
