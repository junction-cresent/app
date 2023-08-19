import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ChatData from "@app/resources/data/chat.json";
import { log } from "@app/utils/logging";

import Chat from "./screens/chatting";

type ChatDataKeys = keyof typeof ChatData;
export type ChatStackParamList = {
  Chat: {
    data: (typeof ChatData)[ChatDataKeys];
  };
};
export type ChatStackNavigationProps = StackNavigationProp<ChatStackParamList>;
const Stack = createStackNavigator();
const ChatStack = () => {
  log("REND", "Root Stack > Main Stack > Chat Stack");
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default ChatStack;
