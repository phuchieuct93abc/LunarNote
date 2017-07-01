import React from 'react';
import List from './src/pages/list'
import ViewItem from './src/pages/viewItem'
import { Button } from 'react-native-elements';
import { StatusBar, AppRegistry,Text, View ,FlatList} from 'react-native';

import {  StackNavigator} from 'react-navigation'; 
const Color={
  button:"#2096F3"
}

export  class HomeScreen extends React.Component {
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
      <View style={{flex:1}}>  
         <StatusBar
     backgroundColor="blue"
     barStyle="light-content"  
   />
          <View>
            <Text>Header</Text>
          </View>

          <View style={{flexDirection: 'column',flex:1,flexWrap: 'wrap'}}>
 
                  {buttons.map((item) => {return <Button raised backgroundColor={Color.button} key={item.key} style={{height:30}} title={item.name} onPress={()=>navigate("List",{item:item})}></Button>})}

          </View>

          <View>
            <Text>Footer</Text>
          </View>
      </View>

    );
  }
}


const Navigator = StackNavigator({
  Home: { screen: HomeScreen }, //Default entry screen
  List: { screen: List }, //Default entry screen
  ViewItem: { screen: ViewItem }, //Default entry screen
});

export default Navigator 