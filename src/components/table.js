
import React, { Component } from 'react';
import {
    View,
    Image,
    ToastAndroid, StyleSheet, ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardItem, CardBody, Tabs, Tab, Container, Form, Item, Input, Label, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import EditableCell from '@components/editableCell'
import * as Animatable from 'react-native-animatable';
// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import { FBLogin, FBLoginManager, FBLoginView } from 'react-native-facebook-login';
import { TouchableOpacity } from "react-native"

export default class Table extends Component {
    onPress(value, index) {
        
        this.props.onSelect(index)
    }
    generateColumn(item, rowIndex) {
        return item.map((item, columnIndex) => {
            var onSelected = false
            if(this.props.selectedCell){
                var selectedRowIndex =  this.props.selectedCell.rowIndex
                var selectedColumnIndex =  this.props.selectedCell.columnIndex
                if(selectedRowIndex == rowIndex && selectedColumnIndex ==columnIndex){
                    onSelected =true;
                    
                }
            }
            var editableCell = <EditableCell onSelected={onSelected} value={item} index={{ rowIndex, columnIndex }} onPress={this.onPress.bind(this)} />
            
            return (<Col key={rowIndex + "_" + columnIndex} > 
                {editableCell}
            </Col>)
        }
        )
    }
    generateRow(table) {
        return table.map((item, rowIndex) => {
            return (<Row key={rowIndex}>{this.generateColumn(item, rowIndex)}</Row>)

        })


    }
    generateTable() {
        return (
            <Grid>
                {this.generateRow(this.props.table)}
            </Grid>)
    }
    render = () => (
        <View>
            {this.generateTable()}
        </View>

    );

}

