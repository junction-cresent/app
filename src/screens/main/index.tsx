import type { IndexStackParamList } from "./stack";
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { log } from "@app/utils/logging";

import IndexStack from "./stack";

export type MainStackParamList = {
  IndexStack: NavigatorScreenParams<IndexStackParamList>;
};
export type MainStackNavigationProps = StackNavigationProp<MainStackParamList>;
const Stack = createStackNavigator<MainStackParamList>();
const Main = () => {
  log("REND", "Root Stack > Main Stack");
  return (
    <Stack.Navigator
      initialRouteName="IndexStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="IndexStack" component={IndexStack} />
    </Stack.Navigator>
  );
};

export default Main;
