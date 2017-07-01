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
import Video from "react-native-video";

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
export default class ViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.article = this.props.navigation.state.params.article;
    this.state = { article: this.article };
  }
  _renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == "p" && node.attribs.class == "body-image") {
      let url = node.children[0].attribs.src;
      const screenWidth = Dimensions.get("window").width - 10;

      return (
        <Image
          key={index}
          source={{ uri: url }}
          style={{ flex: 3, width: screenWidth, height: 150 }}
        />
      );
    } else if (node.name == "p" && node.attribs.class == "body-video") {
      let source = node.children[0].children[0].attribs["data-src"];
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

  componentDidMount() {
    this._getArticleContent(this.article.ContentID).then(content => {
      this.article.Content = content;
      this.setState({ article: this.article });
    });
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.article.SourceName}`
  });

  render() {
    let videoUrl =
      "http://baomoi-video-tr.zadn.vn/b79e18d6708046802a5a49821ae35c4c/595860a9/streaming.baomoi.com/2017/07/01/255/22652235/4706329.mp4";

    return (
      <ScrollView style={styles.wrapper}>
        <Text style={styles.title}>
          {this.state.article.Title}
        </Text>
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

        <Text>
          {this.state.article.ContentID}
        </Text>

        <Text>
          {this.state.article.Content}{" "}
        </Text>
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
    padding: 10
  },
  backgroundVideo: {
    height: 300,
    width: 300
  }
});
