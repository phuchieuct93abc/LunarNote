import React from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { selectCategory } from "../actions";

const Home = ({ moveToList, currentId }) => {
  let buttons = [
    {
      name: "Tin mới",
      key: "url1"
    },
    {
      name: "Công nghệ",
      key: "url2"
    },
    {
      name: "Tin mới",
      key: "url3"
    },
    {
      name: "Tin mới",
      key: "url4"
    },
    {
      name: "Công nghệ",
      key: "url5"
    },
    {
      name: "Tin mới",
      key: "url6"
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <Text>
        {currentId}
      </Text>

      <View style={{ flexDirection: "column", flex: 1, flexWrap: "wrap" }}>
        {buttons.map(item => {
          return (
            <Button
              raised
              backgroundColor={Color.button}
              key={item.key}
              style={{ height: 30 }}
              title={item.name}
              onPress={() => moveToList(item.key)}
            />
          );
        })}
      </View>

      <View>
        <Text>Footer</Text>
      </View>
    </View>
  );
};
Home.navigationOptions = {
  title: "Home Screen"
};
const Color = {
  button: "#2096F3"
};
const mapStateToProps = state => {
  return {
    currentId: state.category.id
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    moveToList: id => {
      dispatch(selectCategory(id));
      dispatch(NavigationActions.navigate({ routeName: "List" }));
    }
  };
};

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeScreen;
