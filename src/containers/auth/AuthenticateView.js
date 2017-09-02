/**
 * Authenticate Screen
 *  - Entry screen for all authentication
 *  - User can tap to login, forget password, signup...
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  ToastAndroid, StyleSheet, ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardItem, CardBody, Tabs, Tab, Container, Form, Item, Input, Label, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { connect } from 'react-redux';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import FBLoginView from './FBLoginView'
/* Styles ==================================================================== */


/* Component ==================================================================== */
const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
})

const mapDispatchToProps = (dispatch) => ({
  nextScene: Actions.main
});
@firebaseConnect()
@connect(mapStateToProps, mapDispatchToProps)
class Authenticate extends Component {
  static componentName = 'Authenticate';
  login() {

    this.props.firebase.login({

      email: this.state.username,
      password: this.state.password

    }).then((item) => {
      this.props.nextScene()

    }).catch(() => {

      ToastAndroid.show('Login failed 123', ToastAndroid.SHORT);

    })
  }
  signup() {

    this.props.firebase.createUser({

      email: this.state.signUpUsername,
      password: this.state.signUpPassword

    }).then(Actions.main).catch(() => {

      ToastAndroid.show('Signup failed', ToastAndroid.SHORT);

    })


  }
  onLoginFB({ credentials: { token } }) {

    let credential = this.props.firebase.auth.FacebookAuthProvider.credential(token);

    this.props.firebase.auth().signInWithCredential(credential)
      .then((user) => {
        Actions.main()
      }).catch((err) => {
        ToastAndroid.show('Signup failed', ToastAndroid.SHORT);
      });

  }
  render = () => {
    if (!isLoaded(this.props.auth)) {
      return <ActivityIndicator />
    }
    return (<Container>
      <Tabs>
        <Tab heading="Login">
          <Content>


            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={(username) => this.setState({ username })} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input secureTextEntry={true}
                  onChangeText={(password) => this.setState({ password })} />
              </Item>

              <Button block success onPress={this.login.bind(this)}>
                <Text>Success</Text>
              </Button>
              <FBLogin
                buttonView={<FBLoginView />}
                ref={(fbLogin) => { this.fbLogin = fbLogin }}
                loginBehavior={FBLoginManager.LoginBehaviors.Native}
                permissions={["email", "user_friends"]}
                onLogin={this.onLoginFB.bind(this)}
                onLoginFound={function (e) { console.log(e) }}
                onLoginNotFound={function (e) { console.log(e) }}
                onLogout={function (e) { console.log(e) }}
                onCancel={function (e) { console.log(e) }}
                onPermissionsMissing={function (e) { console.log(e) }}
              />

            </Form>


          </Content>


        </Tab>
        <Tab heading="Signup">

          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(signUpUsername) => this.setState({ signUpUsername })} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true}
                onChangeText={(signUpPassword) => this.setState({ signUpPassword })} />
            </Item>

            <Button block success onPress={this.signup.bind(this)}>
              <Text>Success</Text>
            </Button>

          </Form>

        </Tab>

      </Tabs>




    </Container>
    )
  }
}

/* Export Component ==================================================================== */
export default Authenticate;
