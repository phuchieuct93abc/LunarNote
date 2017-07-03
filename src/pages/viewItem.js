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
import VideoPlayer from "react-native-video-controls";
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
export default class ViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.article = this.props.article;
    this.state = { article: this.article, viewSource: false };
    this._loadStart = this._loadStart.bind(this);
  }
  _onBackVideo() {}
  _loadStart() {
    console.log(this.player);
  }
  _renderNode(node, index, siblings, parent, defaultRenderer) {
    const screenWidth = Dimensions.get("window").width - 10;

    if (node.name == "p" && node.attribs.class == "body-image") {
      let url = node.children[0].attribs.src;

      return (
        <View>
          <Image
            key={index}
            source={{ uri: url }}
            style={{ width: screenWidth, height: 150 }}
          />
        </View>
      );
    } else if (node.name == "p" && node.attribs.class == "body-video") {
      let source = node.children[0].children[0].attribs["data-src"];
      return (
        <VideoPlayer
          source={{ uri: source }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }}
          paused={true}
          onBack={this._onBackVideo}
          onLoadStart={this.loadStart}
          style={{ flex: 1, width: screenWidth, height: 150 }}
        />
      );
    }
  }

  async _getArticleContent(contentId) {
    let content = await fetch(
      "http://dataprovider.touch.baomoi.com/json/article.aspx?articleId=" +
        contentId
    );
    let response = await content.json();
    return response.article.Body;
  }
  state = { isLoading: true };
  componentDidMount() {
    this._getArticleContent(this.article.ContentID).then(content => {
      this.article.Content = content;
      this.setState({ article: this.article, isLoading: false });
    });
  }
  /*  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.article.SourceName}`
  });
*/
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

    if (this.state.isLoading) {
      content = <ActivityIndicator />;
    } else {
      content = (
        <View>
          <Text style={styles.description}>
            {this.state.article.Description}
          </Text>
          <View>
            <HTMLView
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
      <ScrollView style={styles.wrapper}>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={styles.title}>
            {this.state.article.Title}
          </Text>
          {content}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold"
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
