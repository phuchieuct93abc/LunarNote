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

// Components
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { TouchableOpacity } from "react-native"

/* Styles ==================================================================== */


/* Component ==================================================================== */
const mapStateToProps = ({ firebase: { auth } }) => ({
    auth
})
// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({
});
const style = StyleSheet.create({
    profileImage: {
        borderRadius: 50
    }


})
@firebaseConnect()
@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends Component {


    render = () => (
        
        <Container>
            <Body>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: this.props.auth.photoURL }}
                />
                <Text>{this.props.auth.displayName}</Text>
            </Body>
        </Container>



    )
}

;
