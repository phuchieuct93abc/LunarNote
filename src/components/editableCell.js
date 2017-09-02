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
import { FBLogin, FBLoginManager, FBLoginView } from 'react-native-facebook-login';
import { TouchableOpacity } from "react-native"
/* Styles ==================================================================== */


/* Component ==================================================================== */
const mapStateToProps = (state) => ({




})

// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({


});
const style = StyleSheet.create({
    cell: {
        height: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
    },
    selected: {
        borderColor: 'blue'
    },
    nonSelected: {
        borderColor: '#d6d7da',

    }


})
@connect(mapStateToProps, mapDispatchToProps)
export default class EditableCell extends Component {

    show() {

        if (this.props.value != 0) {
            return (<Text>{this.props.value}</Text>)
        }

    }
    render = () => {
        let borderStyle = this.props.onSelected?style.selected:style.nonSelected;
        return (<TouchableOpacity style={[style.cell,borderStyle]} onPress={() => { this.props.onPress(this.props.value, this.props.index) }}>
            {this.show()}

        </TouchableOpacity>
        )
    }




};