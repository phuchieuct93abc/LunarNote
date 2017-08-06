import React from "react";
import { View, Button, TextInput } from "react-native";
import Modal from 'react-native-modalbox';

import { Card, Text } from "react-native-elements";
import Shimmer from 'react-native-shimmer';
import LunarSolarConverter from '../utils';
export default class NoteEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: null
        }
    }
    open() {

        this.refs.modal.open()
    }
    convertToLunar(sonarDate) {
        if (sonarDate) {

            let lunarDate = LunarSolarConverter().getLunarDate(sonarDate);
            return (<View>
                <Text>{{ sonarDate }}</Text>
                <Text>{{ lunarDate }}</Text>
            </View>)

        }


    }

    render() {


        return (
            <Modal style={{ height: 300, width: 300 }} position={"center"} ref={"modal"}
            >
                <Text>Selected Date</Text>
                {this.convertToLunar(this.props.selectedDate)}
                <TextInput
                    placeholder={"Title"}

                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <TextInput
                    placeholder={"Description"}

                    multiline={true}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
            </Modal>
        );
    }
}