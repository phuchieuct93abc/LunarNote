
import React, { Component } from 'react';
import {
  View,StyleSheet

} from 'react-native';
import { Fab,Drawer, Container, Card, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'; import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import EditableCell from '@components/editableCell'
import Keyboard from '@components/keyboard'

import { Col, Row, Grid } from 'react-native-easy-grid';
import { solveSudoku } from '../../logics'
// Consts and Libs
import Table from "../../components/table"
import DrawerView from '@containers/ui/DrawerContainer';
import { Calendar,Agenda} from 'react-native-calendars';
import Modal from 'react-native-modalbox';



/* Component ==================================================================== */
@firebaseConnect()
@connect(
  ({ firebase: { auth }, currentSudoku: { data } }) => ({
    auth,
    table: data

  }),
  (dispatch) => (

    {
     

    }
  )

)
export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isOpenModal:false
    };
  }

  
  loadItems(day) {
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  onCloseModel(){
    this.setState({isOpenModal:false})
  }
  onOpenModal(){
    this.setState({isOpenModal:true})

  }
  render = () => {
    let invisible;
    if(this.state.isOpenModal){
        invisible = styles.invisible
    }
   
    return     (<Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<DrawerView />}
      onClose={() => this.closeDrawer()} >
      <Container>
        <Header>
          {/* <Left>
            <Button transparent onPress={this.openDrawer.bind(this)}>
              <Icon name='menu' />
            </Button>
          </Left> */}
          <Body>
            <Title>LunarNote</Title>

          </Body>
        </Header>
        <View style={{ padding: 10,flex:1 }}>
            
            <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          />
          <View style={invisible}>
             <Fab
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight" 
            onPress={() => this.refs.modal.open()}>
            <Icon name="add" />
            </Fab>
          </View>
         


            <Modal
          style={[styles.modal]}
          ref={"modal"}
          swipeToClose={true}
 onClosed={this.onCloseModel.bind(this)}
          onOpened={this.onOpenModal.bind(this)}
          >
            <Text style={styles.text}>Basic modal</Text>
        </Modal>
        </View>

      </Container>
    </Drawer>


  );


  }

    
}
const styles = StyleSheet.create({
  fab:{
 backgroundColor: '#5067FF' 
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  invisible:{
    display:"none"
  }
});

