import React, { Component } from 'react';
import {
    View,
    Image,
    ToastAndroid, StyleSheet, ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardItem, CardBody, Tabs, Tab, Container, Form, Item, Input, Label, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { FBLogin, FBLoginManager, FBLoginView } from 'react-native-facebook-login';
import { TouchableOpacity } from "react-native"
import { Col, Row, Grid } from 'react-native-easy-grid';

/* Styles ==================================================================== */



const style = StyleSheet.create({
    button: {
        height: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    disableButton: {
        color: "gray"
    }


})
const buttons = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const disableButton = [1, 2, 3]

export default class Keyboard extends Component {

    generateKeyboard() {
        return buttons.map((item) => {

            let columns = item.map((buttonValue) =>
                (<Col key={buttonValue}>
                    <Button disabled={this.isDisable(buttonValue)} full transparent onPress={() => { this.props.onPress(buttonValue) }}>

                        <Text style={StyleSheet.flatten([this.getStyle(buttonValue), style.button])}>{buttonValue}</Text>
                    </Button>
                </Col>)

            )
            return (<Row key={item}>
                {columns}
            </Row>)

        })

    }
    getStyle(buttonValue) {
        if (this.isDisable(buttonValue)) {
            return style.disableButton
        }
    }
    isDisable(buttonValue) {
        return this.props.disabledButtons.includes(buttonValue);
    }

    render = () => (

        <Card>
            <Grid>
                <Col size={7}>
                    {this.generateKeyboard()}
                </Col>
                <Col >
                    <TouchableOpacity onPress={() => { this.props.onPress(0) }} style={{ flex: 1, justifyContent: "center" }}>
                        <Icon size={20} name='remove' style={{ color: "red" }} />
                    </TouchableOpacity>
                </Col>
            </Grid>
        </Card>








    )
}

;
