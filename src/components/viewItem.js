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
  ScrollView,
  Linking,
  RefreshControl,
  Animated
} from "react-native";
import HTMLView from "react-native-htmlview";
import CustomVideoPlayer from "../components/videoPlayer";
import ParallaxView from "react-native-parallax-view";
import { connect } from "react-redux";
import { merge } from "../enums";
import {
  CommonStyles,
  SmallFont,
  MediumFont,
  LargeFont,
  NightModeStyles,
  LightModeStyles,
  scrollViewStyles
} from "./style.js";
import {PullView} from 'react-native-pull';
import {goBack} from '../actions'
import {Title} from './title'

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
class ViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.article = this.props.article;
    this.state = {
      article: this.article,
      viewSource: false,
      scrollY: new Animated.Value(0),
      refreshing: false
    };
    this.getFontSize = this.getFontSize.bind(this);
    this.getStyle = this.getStyle.bind(this);
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

  componentDidMount() {
    this._getArticleContent(this.article.ContentID).then(content => {
      this.article.Content = content;
      this.setState({ article: this.article, isLoading: false });
    });
  }
  getFontSize() {
    switch (this.props.config.fontSize) {
      case 1:
        return SmallFont;
      case 2:
        return MediumFont;
      case 3:
        return LargeFont;
      default:
        return MediumFont;
    }
  }
  getStyle() {
    let baseStype = CommonStyles;
    let fontSizeStyle = this.getFontSize();
    let nightModeStyle = this.props.config.isNightMode
      ? NightModeStyles
      : LightModeStyles;
    return merge(merge(baseStype, fontSizeStyle), nightModeStyle);
  }

    onPullRelease(resolve) {
    //do something
        this.props.goBack()
           setTimeout(resolve,500) 
       
    }

  render() {
    let style = this.getStyle();
    let videoUrl =
      "http://baomoi-video-tr.zadn.vn/b79e18d6708046802a5a49821ae35c4c/595860a9/streaming.baomoi.com/2017/07/01/255/22652235/4706329.mp4";
    var content;
    var source;
    const event = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this.state.scrollY
          }
        }
      }
    ]);
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
      content = (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      content = (
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={style.description}>
            {this.state.article.Description}
          </Text>
          <View style={CommonStyles.wrapper}>
            <HTMLView
              key={
                JSON.stringify(this.props.config) +
                "_" +
                this.state.article.ContentID
              }
              style={CommonStyles.flex}
              stylesheet={style}
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
      <PullView  onPullRelease={this.onPullRelease.bind(this)}>
        <ParallaxView
          backgroundSource={{ uri: this.state.article.LandscapeAvatar }}
          windowHeight={200}
          header={
            <Title title={this.state.article.Title}/>
          
          }

        >
          <View style={style.wrapper}>
            {content}
          </View>
        </ParallaxView>
      </PullView>
    );
  }
}
const mapStateToProps = state => {
  return {
    config: {
      isNightMode: state.values.nightMode,
      fontSize: parseInt(state.values.fontSize)
    }
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goBack:()=>{
      dispatch(goBack())

    }
  };
};

ViewItem = connect(mapStateToProps, mapDispatchToProps)(ViewItem);

export default ViewItem;
