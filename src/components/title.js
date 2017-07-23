import { StyleSheet, View, Text } from "react-native";
import React from "react";

export const Title = ({ title }) => {
  return (
    <View style={style.wrapper}>
      <View style={style.titleWrapper}>
        <Text style={style.title}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
    paddingRight: 5
  },

  titleWrapper: { backgroundColor: "rgba(0,0,0,.6)", flex: 1 }
});
