import React from 'react';
import List from './pages/list'
import {  Text, View ,Button,FlatList} from 'react-native';

import {  StackNavigator} from 'react-navigation';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
   title: 'Welcome',
 }; 

  constructor(props){
      super(props);
      this.state={
        list:[]
      }


  }

  render() {
    const { navigate } = this.props.navigation;

    let buttons = [
      {
        name:"Tin mới",
        key:"url1"
      },
      {
        name:"Công nghệ",
        key:"url2"
      },    {
            name:"Tin mới",
            key:"url3"
          },
          {
            name:"Tin mới",
            key:"url4"
          },
          {
            name:"Công nghệ",
            key:"url5"
          },    {
                name:"Tin mới",
                key:"url6"
              },

    ]

    return (
      <View style={{flex:1,padding:20}}>
          <View>
            <Text>Header</Text>
          </View>

          <View style={{flexDirection: 'column',flex:1,flexWrap: 'wrap' }}>

                  {buttons.map((item) => {return <Button style={{height:30}} title={item.name} onPress={()=>navigate("List")}></Button>})}

          </View>

          <View>
            <Text>Footer</Text>
          </View>
      </View>


    );
  }
}


const App = StackNavigator({
  Home: { screen: HomeScreen },
  List:{screen:List}

});
