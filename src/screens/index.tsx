import type { StackNavigationProp } from "@react-navigation/stack";

import React from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useRecoilValue } from "recoil";

import Auth from "@app/screens/auth";
import Main from "@app/screens/main";
import { authAtom } from "@app/utils/atoms";
import { log } from "@app/utils/logging";

export type RootStackParamList = {
  Empty: undefined;
  Auth: undefined;
  Main: undefined;
};
export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
const Stack = createStackNavigator<RootStackParamList>();
const Root = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const auth = useRecoilValue(authAtom);

  React.useEffect(() => {
    if (auth.authenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    }
  }, [navigation, auth.authenticated]);

  log("REND", "Root Stack");
  return (
    <Stack.Navigator
      initialRouteName="Empty"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="Empty" component={Empty} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};

const Empty = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
      }}
    />
  );
};

export default Root;
