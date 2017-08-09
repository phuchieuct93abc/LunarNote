import React from "react";
import { View, Text, Button, StyleSheet, TouchableNativeFeedback, TextInput } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { addTodo } from "../actions";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import LunarSolarConverter from '../utils'
import NoteEditor from '../components/newNote'

import { pathToJS, firebaseConnect, firebase, dataToJS ,populate} from 'react-redux-firebase'



class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      modalVisible: false
    };
    this._createNewNote = this._createNewNote.bind(this)

  }
    componentDidMount(){

       
    }

  getTodos() {
    if (this.props.todos) {
      return Object.keys(this.props.todos).map(
        (key, id) => (
          <View key={key}>
            <Text>Title: {this.props.todos[key].title}</Text>
            <Text>Description: {this.props.todos[key].description}</Text>
          </View>
        )
      )

    }

  }




  render() {
    let calendar = (<View style={{ flex: 1 }}>
      <NoteEditor ref={"modal3"} selectedDate={this.state.selectedDate} />
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />

    </View>)
    return (
      <View style={{ flex: 1 }}>
        {this.getTodos()}
        <NoteEditor style={{ flex: 1 }} save={this.props.addTodo}></NoteEditor>

      </View>

    );
  }
  getLunarDate(date) {

    let object = LunarSolarConverter().SolarToLunar({
      solarDay: date.getDay(),
      solarMonth: date.getMonth(),
      solarYear: date.getFullYear()



    })

    return object;
  }

  loadItems(day) {


    /*
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
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
          Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
          this.setState({
            items: newItems
          });
        }, 1000);
        */
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  renderEmptyDate(selectedDate) {
    return (
      <View style={styles.emptyDate}>
        <TouchableNativeFeedback
          onPress={() => { this._createNewNote(selectedDate) }}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={{ width: 150, height: 100 }}>
            <Text>Add new item</Text>
          </View>
        </TouchableNativeFeedback>


      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  _createNewNote(date) {
    console.log("AAAAAAAA", date['0'])
    this.setState({ selectedDate: date['0'] })
    this.refs.modal3.open()



  }
}

const styles = StyleSheet.create({
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
    flex: 1,
    paddingTop: 30
  }


});
Home.navigationOptions = {
  title: "Calendar"
};
const Color = {
  button: "#2096F3"
};
const mapStateToProps =({ firebase: { data: { todos } } }) => ({ // state.firebase.data.todos
    // todos prop set to firebase data in redux under '/todos'
    todos,
  })


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTodo: (item) => {
      dispatch(addTodo(item));
    }
  };
};
const wrappedTodos = firebaseConnect([
    'todos'
])(Home)

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(wrappedTodos)


export default HomeScreen;
