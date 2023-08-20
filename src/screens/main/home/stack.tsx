import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ChallengesData from "@app/resources/data/challenges.json";
import MatchingData from "@app/resources/data/matching.json";
import UsersData from "@app/resources/data/users.json";
import { log } from "@app/utils/logging";

import Accepted from "./screens/accepted";
import Challenge from "./screens/challenge";
import Challenges from "./screens/challenges";
import Choosing from "./screens/choosing";
import Detail from "./screens/detail";
import Go from "./screens/go";
import Group from "./screens/group";
import Grouping from "./screens/grouping";
import Matching from "./screens/matching";
import Request from "./screens/request";
import Reward from "./screens/reward";

export type HomeStackParamList = {
  Matching: undefined;
  Challenges: undefined;
  Detail: {
    data: (typeof ChallengesData)[keyof typeof ChallengesData];
  };
  Request: {
    data: (typeof UsersData)[keyof typeof UsersData];
  };
  Accepted: {
    data: (typeof UsersData)[keyof typeof UsersData];
  };
  Go: {
    data: (typeof UsersData)[keyof typeof UsersData];
  };
  Challenge: undefined;
  Reward: undefined;
  Grouping: undefined;
  Choosing: undefined;
  Group: undefined;
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
      <Stack.Screen name="Request" component={Request} />
      <Stack.Screen name="Accepted" component={Accepted} />
      <Stack.Screen name="Go" component={Go} />
      <Stack.Screen name="Challenge" component={Challenge} />
      <Stack.Screen name="Reward" component={Reward} />
      <Stack.Screen name="Grouping" component={Grouping} />
      <Stack.Screen name="Choosing" component={Choosing} />
      <Stack.Screen name="Group" component={Group} />
    </Stack.Navigator>
  );
};

export default HomeStack;
