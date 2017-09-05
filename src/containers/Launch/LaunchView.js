
import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Dimensions,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { H1, Card, CardItem, CardBody, Tabs, Tab, Container, Form, Item, Input, Label, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
// Consts and Libs

// Components
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { FBLogin, FBLoginManager, FBLoginView } from 'react-native-facebook-login';
import AuthenticateView from "../auth/AuthenticateView" 
const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
})
// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({});
@firebaseConnect()
@connect(mapStateToProps, mapDispatchToProps)
export default class AppLaunch extends Component {
  static componentName = 'AppLaunch';
  constructor(props) {
    super(props);
    this.state = {
      onLoadImage: false,
      isAuthorized: null
    }
    Actions.main({ type: 'reset' })
    

  }
  onLoad() {
    this.setState({ onLoadImage: true })
  }


  componentDidUpdate = () => {

    if (isLoaded && this.state.onLoadImage && this.state.isAuthorized==null) {
      setTimeout(() => {
        if (this.props.auth.uid) {
          //this.setState({ isAuthorized: false })
          
          Actions.main({ type: 'reset' })

        } else {
          console.log("unauthorired")
          this.setState({ isAuthorized: false })
         // Actions.authenticate({ type: 'reset' })
        }
      }, 3000)
    }
  }

  render = () => {
    const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
    let image = require("./images.jpg")
    let flash = (
      <Animatable.View animation="zoomInUp" duration={3000}    >

        <H1 style={{ color: "#ffef00" }}>LunarNote</H1>
        <ActivityIndicator
          animating
          size={'large'}
          color={'#ffef00'}
        />

      </Animatable.View>)

    return (

      <Container>
        <Content>
          <Image
            onLoad={this.onLoad.bind(this)}
            style={{ height: screenHeight, width: screenWidth, justifyContent: 'center', alignItems: "center" }}
            source={image}
          >
            {this.state.isAuthorized==null && flash}
            {this.state.isAuthorized==false && (<AuthenticateView />)}
          </Image>


        </Content>
      </Container>

    );
  }
}
