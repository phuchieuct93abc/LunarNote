import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    Dimensions,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Textarea, H1, Card, CardItem, CardBody, Tabs, Tab, Container, Form, Item, Input, Label, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text } from 'native-base';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';

// Consts and Libs

// Components
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { FBLogin, FBLoginManager, FBLoginView } from 'react-native-facebook-login';
import AuthenticateView from "../auth/AuthenticateView"
import Modal from 'react-native-modalbox';

const mapStateToProps = ({ firebase: { auth } }) => ({
    auth
})
// Any actions to map to the component?
const mapDispatchToProps = (dispatch) => ({});
@firebaseConnect()
@connect(mapStateToProps, mapDispatchToProps)
export default class EditNote extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            console.log("123")
            this.refs.modal.open()
        } else {
            this.refs.modal.close()
        }


    }

    render = () => {

        return (
            <Modal
                style={[styles.modal]}
                ref={"modal"}
                swipeToClose={true}
                onClosed={this.props.onCloseModal}
                onOpened={this.props.onOpenModal}
                style={{ flex: 1 }}
            >
                <Content>
                    <Form style={{ flex: 1 }}>

                        <Grid style={{ padding: 10 }}>
                            <Row>
                                <Col size={3}>
                                    <Item stackedLabel>
                                        <Label>Lunar date</Label>
                                        <Input />
                                    </Item>
                                </Col>
                                <Col size={1} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Icon name='exchange' size={20} style={{ marginTop: 40, marginLeft: 10 }} />

                                </Col>
                                <Col size={3}>
                                    <Item stackedLabel>
                                        <Label>Solar date</Label>
                                        <Input />
                                    </Item>
                                </Col>
                            </Row>
                            <Row>
                                <Item floatingLabel style={{ flex: 1 }}>
                                    <Label>Title</Label>
                                    <Input onChangeText={(title) => this.setState({ title })} />
                                </Item>
                            </Row>
                            <Row>
                                <Item floatingLabel style={{ flex: 1 }}>
                                    <Label>Description</Label>
                                    <Input
                                        multiline={true} numberOfLines={4}
                                        onChangeText={(title) => this.setState({ title })} />
                                </Item>

                            </Row>
                            <Row style={{ justifyContent: "flex-end" }}>
                                <Button transparent ><Text>Cancel</Text></Button>
                                <Button transparent><Text>Save</Text></Button>
                            </Row>

                        </Grid>
                    </Form>
                </Content>
            </Modal>

        );
    }
}
const styles = StyleSheet.create({


    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    }

});
