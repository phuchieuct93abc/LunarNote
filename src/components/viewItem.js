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
  ScrollView,Linking
} from "react-native";
import HTMLView from "react-native-htmlview";
import CustomVideoPlayer from "../components/videoPlayer";
import ParallaxView from "react-native-parallax-view";
import { connect } from "react-redux";

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
class ViewItem extends React.Component {
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

  componentDidMount() {
    this._getArticleContent(this.article.ContentID).then(content => {
      this.article.Content = content;
      this.setState({ article: this.article, isLoading: false });
    });
  }
  getFontSize(){
    switch(this.props.fontSize){
      case 1 :return SmallFont
      case 2 :return MediumFont
      case 3: retur :LargeFont

    }

  }
  render() {
    let styles = this.props.config.isNightMode?NightModeStyles:LightModeStyles
    let fontSize =
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
        <View style={{flex:1,padding:10}}>
          <Text style={[CommonStyles.description,styles.textColor]}>
            {this.state.article.Description}

          </Text>
          <View style={CommonStyles.wrapper}>
            <HTMLView
              key={JSON.stringify(this.props.config)+"_"+this.state.article.ContentID}
              style={CommonStyles.flex}
              stylesheet={{...CommonStyles,...styles}}
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
            <Text style={CommonStyles.title}>
            {this.state.article.Title}
          </Text>
        </View>


        </View>

        }

      >
        <View style={[CommonStyles.wrapper,styles.wrapper]}>

          {content}
        </View>
      </ParallaxView>


    );
  }
}
const mapStateToProps = state => {
  return {
    config:{
      isNightMode: state.values.nightMode,
      fontSize:state.values.fontSize

    }
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

const black = "#606060"
const white = "#ffffff"
const SmallFont = StyleSheet.create({
  title:{
    fontSize: 20,

  }
})
const MediumFont = StyleSheet.create({
})

  const LargeFont = StyleSheet.create({
})
const CommonStyles = StyleSheet.create({
  flex:{
    flex: 1
  },
  wrapper:{
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color:"white",
    paddingLeft:10,
    paddingRight:5,
  },
  description: {
    fontSize: 25,
    marginBottom: 5,
    fontStyle: "italic",
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
  },
  ins:{
    fontWeight: "bold",
    fontSize: 20
  }


})
const NightModeStyles = StyleSheet.create({
wrapper:{
  backgroundColor:black,

},
textColor:{
  color:white
},
p:{
  color:"white",
  fontSize: 20,
  paddingLeft: 20
},
strong: {
    color:white,
  fontWeight: "bold",
  fontSize: 20
},
em: {
    color:white,
  fontWeight: "bold",
  fontSize: 20
},
ins:{
  color:white,
fontWeight: "bold",
fontSize: 20
}
});

const LightModeStyles = StyleSheet.create({
  wrapper:{

  },
  textColor:{
  }

});
ViewItem = connect(mapStateToProps, mapDispatchToProps)(ViewItem);

export default ViewItem;
