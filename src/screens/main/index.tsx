import type { ChatStackParamList } from "./chat/stack";
import type { HomeStackParamList } from "./home/stack";
import type { IndexStackParamList } from "./stack";
import type { NavigatorScreenParams } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { log } from "@app/utils/logging";

import ChatStack from "./chat/stack";
import HomeStack from "./home/stack";
import IndexStack from "./stack";

export type MainStackParamList = {
  IndexStack: NavigatorScreenParams<IndexStackParamList>;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
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
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="ChatStack" component={ChatStack} />
    </Stack.Navigator>
  );
};

export default Main;
