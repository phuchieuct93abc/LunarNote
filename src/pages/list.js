import React from 'react';
import {ActivityIndicator, StyleSheet,ListView, Text, View,Button,FlatList } from 'react-native';
import ListItem from '../components/listItem'

export default  class List extends React.Component {
  constructor(props){
    super(props);
     this.state = {
      isLoading: true
    }
 
  }
  componentDidMount(){
     return fetch('http://dataprovider.touch.baomoi.com/json/articlelist.aspx?start=0&count=10&listType=zone&listId=53&imageMinSize=300&mode=quickview')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.articlelist),
          });
      })
      .catch((error) => {
        console.error(error); 
      });
       

  

  }


  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.item.name}`,
  });
  render() {
    const { params } = this.props.navigation.state; 
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}> 
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={{ padding: 5}}><ListItem article={rowData}></ListItem></View>}
        />
      </View>
    );
  }
}

