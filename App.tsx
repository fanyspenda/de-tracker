import React from "react";
import { View, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import constants from "expo-constants";
// import styled from "styled-components/native";

import InputExpenditure from "./src/pages/inputExpenditure";
import LogExpenditure from "./src/pages/logExpenditure";

const MainNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: LogExpenditure,
      navigationOptions: {
        title: "Home"
      }
    },
    InputExpenditure: {
      screen: InputExpenditure,
      navigationOptions: {
        title: "Expenditure"
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default () => (
  <View style={style.container}>
    <AppContainer />
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: constants.statusBarHeight,
    paddingHorizontal: 5
  }
});
