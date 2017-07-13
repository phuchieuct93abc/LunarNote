import React from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  ScrollView
} from "react-native";
import HTMLView from "react-native-htmlview";
import CustomVideoPlayer from "../components/videoPlayer";
import ParallaxView from "react-native-parallax-view";
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
export default class ViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.article = this.props.article;
    this.state = { article: this.article, viewSource: false };
  }

  _renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == "p" && node.attribs.class == "body-image") {
      let url = node.children[0].attribs.src;

      return (
        <View>
          <Image key={index} source={{ uri: url }} style={{ height: 200 }} />
        </View>
      );
    } else if (node.name == "p" && node.attribs.class == "body-video") {
      let video = node.children[0];
      let source = video.children[0];
      let videoUrl = source.attribs["data-src"];
      let poster = video.attribs["poster"];
      let width = video.attribs["data-width"];
      let height = video.attribs["data-height"];
      return (
        <CustomVideoPlayer
          video={videoUrl}
          poster={poster}
          size={{ width: width, height: height }}
        />
      );
    }
  }

  async _getArticleContent(contentId) {
    return fetch(
      "http://dataprovider.touch.baomoi.com/json/article.aspx?articleId=" +
        contentId
    )
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.article.Body;
      });
  }
  state = { isLoading: true };

  componentDidMount() { 
    this._getArticleContent(this.article.ContentID).then(content => {
      this.article.Content = content;
      this.setState({ article: this.article, isLoading: false });
    });
  }
  render() {
    let videoUrl =
      "http://baomoi-video-tr.zadn.vn/b79e18d6708046802a5a49821ae35c4c/595860a9/streaming.baomoi.com/2017/07/01/255/22652235/4706329.mp4";
    var content;
    var source;
    if (this.state.viewSource) {
      source = (
        <View>
          <Text>
            {this.state.article.ContentID}
          </Text>
          <Text>
            {this.state.article.Content}
          </Text>
        </View>
      );
    }

    if (this.state.isLoading ) {
      content = <View style={{flex:1}}><ActivityIndicator /></View>; 
    } else {
      content = (
        <View style={{ flex: 1 }}>
          <Text style={styles.description}>
            {this.state.article.Description}
          }
          </Text>
          <View style={{ flex: 1 }}>
            <HTMLView
              style={{ flex: 1 }}
              stylesheet={styles}
              value={this.state.article.Content}
              renderNode={this._renderNode}
            />
          </View>
          <Button
            onPress={() =>
              this.setState({ viewSource: !this.state.viewSource })}
            title="View source"
          />
          {source}
        </View>
      );
    }

    return (
      <ParallaxView
        backgroundSource={{uri:this.state.article.LandscapeAvatar}}
        windowHeight={200}
        header={<View style={{flex:1,justifyContent:"flex-end",alignItems:"flex-end",flexDirection:"row"}}>
        <View style={{backgroundColor:'rgba(0,0,0,.6)',flex:1}}>
            <Text style={styles.title}>
            {this.state.article.Title}
          </Text>
        </View>

         
        </View>
          
        }
     
      >
        <View style={{ flex: 1, padding: 10 }}>
         
          {content}
        </View>
      </ParallaxView>

      /*
      <ScrollView style={styles.wrapper}>
       
      </ScrollView>*/
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color:"white",
    paddingLeft:10,
    paddingRight:5
  },
  description: {
    fontSize: 25,
    marginBottom: 5,
    fontStyle: "italic"
  },
  p: {
    fontSize: 20,
    paddingLeft: 20
  },
  wrapper: {
    flex: 1
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  strong: {
    fontWeight: "bold",
    fontSize: 20
  },
  em: {
    fontWeight: "bold",
    fontSize: 20
  }
});
