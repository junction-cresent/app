import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ChallengesData from "@app/resources/data/challenges.json";
import { log } from "@app/utils/logging";

import Challenges from "./screens/challenges";
import Detail from "./screens/detail";
import Matching from "./screens/matching";

export type HomeStackParamList = {
  Matching: undefined;
  Challenges: undefined;
  Detail: {
    data: (typeof ChallengesData)[keyof typeof ChallengesData];
  };
};
export type HomeStackNavigationProps = StackNavigationProp<HomeStackParamList>;
const Stack = createStackNavigator();
const HomeStack = () => {
  log("REND", "Root Stack > Main Stack > Home Stack");
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Matching" component={Matching} />
      <Stack.Screen name="Challenges" component={Challenges} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
