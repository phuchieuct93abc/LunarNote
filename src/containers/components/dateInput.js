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
import { Calendar } from 'react-native-calendars';
import { Constants } from '@constants'
// Consts and Libs

// Components
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { FBLogin, FBLoginManager, FBLoginView } from 'react-native-facebook-login';
import AuthenticateView from "../auth/AuthenticateView"
import Modal from 'react-native-modalbox';
import moment from "moment"
export default class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCalendar: false,
            currentDate: moment().format(Constants.dateFormat),
            date: moment().format(Constants.dateFormat),
            markedDates: {


            }
        }


    }


    onCloseModal() {
        this.props.onCancel()
    }
    openCalendar() {
        this.setState({ isShowCalendar: true })
    }
    onSave() {
        this.props.onSave(this.state.note)

    }
    onDayPress(selectedDate) {
        var markedDates = {}
        markedDates[selectedDate.dateString] = {
            selected: true
        }

        this.setState({
            isShowCalendar: false,
            markedDates,
            date: selectedDate.dateString

        })


    }
    render = () => {
        let calendarStyle = this.state.isShowCalendar ? null : styles.hidden;
        return (<View>
            <Item stackedLabel>
                <Label>Lunar date</Label>
                <Input value={this.state.date} disabled onFocus={() => { console.log("press") }} />
                <Icon onPress={this.openCalendar.bind(this)} name='calendar' size={20} style={styles.calendarIcon} />
            </Item>

            <View style={[calendarStyle, styles.calendarModal]}>
                <Calendar
                    markedDates={this.state.markedDates}
                    currentDate={this.state.currentDate}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={this.onDayPress.bind(this)}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    // Hide month navigation arrows. Default = false
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    // Do not show days of other months in month page. Default = false
                    // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                />
            </View>

        </View>)
    }
}
const styles = StyleSheet.create({

    calendarModal: {
        position: "absolute",
        backgroundColor: "white",
        zIndex: 9999999


    },
    hidden: {
        display: "none"
    },
    calendarIcon: {
        position: "absolute",
        right: 0,
        bottom: 15
    }

});
