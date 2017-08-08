import React from "react";
import { View, Button, TextInput } from "react-native";
import Modal from 'react-native-modalbox';

import { Card, Text } from "react-native-elements";
import Shimmer from 'react-native-shimmer';
import LunarSolarConverter from '../utils';
import {DateFormatter} from '../utils/dateFormat'
export default class NoteEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: null,
            description: null,
        }
    }
    open() {

        this.refs.modal.open()
    }
    convertToLunar(solarDate) {
        if (solarDate) {

            let lunarDate = LunarSolarConverter().getLunarDate(solarDate);
            let lunarDateString = DateFormatter(lunarDate.lunarDay+1,lunarDate.lunarMonth,lunarDate.lunarYear)
            let solarDateString = DateFormatter(solarDate.getDate(),solarDate.getMonth(),solarDate.getFullYear()) 
            return (<View>
                <Text>{solarDateString}</Text>
                <Text>{lunarDateString}</Text>
            </View>)

        }


    }
    onSave(){
this.props.save({
title:this.state.title,
description:this.state.description

})

    }

    render() {


        return (
          <View>
                <Text>Selected Date</Text>
                {this.convertToLunar(this.props.selectedDate)}
                <TextInput
                    placeholder={"Title"}

                    onChangeText={(text) => this.setState({ title:text })}
                    value={this.state.title}
                />
                <TextInput
                    placeholder={"Description"}

                    multiline={true}
                    onChangeText={(text) => this.setState({ description:text })}
                    value={this.state.description}
                />
                <Button title="Save" onPress={this.onSave.bind(this)}></Button>
           </View>
        );
    }
}