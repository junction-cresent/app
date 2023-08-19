import type { SvgIconName } from "@app/components";
import type {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import type {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";

import React from "react";
import { View, Pressable } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Text, SvgIcon } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import { log } from "@app/utils/logging";

import Chat from "./chat";
import Home from "./home";
import Near from "./near";
import Post from "./post";
import Profile from "./profile";

export type IndexStackParamList = {
  Home: undefined;
  Near: undefined;
  Post: undefined;
  Chat: undefined;
  Profile: undefined;
};
type PageConfig = {
  [key in keyof IndexStackParamList]: {
    component: React.FC;
    icon?: SvgIconName;
  };
};
const Stack = createBottomTabNavigator<IndexStackParamList>();
const IndexNavigator = () => {
  const pageConfig: PageConfig = {
    Home: {
      component: Home,
    },
    Near: {
      component: Near,
    },
    Post: {
      component: Post,
    },
    Chat: {
      component: Chat,
    },
    Profile: {
      component: Profile,
    },
  };

  log("REND", "Root Stack > Main Stack > Index Stack");
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props) => (
        <Navbar
          pageConfig={pageConfig}
          state={props.state}
          descriptors={props.descriptors}
          navigation={props.navigation}
        />
      )}
      initialRouteName="Home"
      sceneContainerStyle={{
        backgroundColor: "transparent",
      }}>
      {Object.keys(pageConfig).map((key: keyof IndexStackParamList) => (
        <Stack.Screen
          key={key}
          name={key}
          component={pageConfig[key].component}
        />
      ))}
    </Stack.Navigator>
  );
};

interface NavbarProps {
  pageConfig: PageConfig;
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}
const Navbar: React.FC<NavbarProps> = ({
  pageConfig,
  state,
  descriptors,
  navigation,
}) => {
  const { colors, styles } = React.useContext(ThemeContext);

  log(
    "REND",
    `Root Stack > Main Stack > Index Stack > ${
      Object.keys(pageConfig)[state.index]
    }`,
  );
  return (
    <View style={styles.navbar.navbar}>
      <View style={styles.navbar.inner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const title = route.name;
          const isFocused = state.index === index;
          return (
            <Pressable
              key={index}
              testID={options.tabBarTestID}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, {
                    merge: true,
                  });
                }
                ReactNativeHapticFeedback.trigger("soft");
              }}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}>
              {isFocused ? (
                <View
                  style={[
                    styles.navbar.focused,
                    Object.keys(pageConfig).indexOf(title) === 0 && {
                      marginLeft: -12,
                    },
                    Object.keys(pageConfig).indexOf(title) ===
                      Object.keys(pageConfig).length - 1 && {
                      marginRight: -12,
                    },
                  ]}>
                  <SvgIcon
                    name={`Navbar${title}FocusedSvg` as SvgIconName}
                    fill={colors.grayscale900}
                  />
                  <Text style={styles.navbar.focusedText}>{title}</Text>
                </View>
              ) : (
                <View style={styles.navbar.unfocused}>
                  <SvgIcon
                    name={`Navbar${title}Svg` as SvgIconName}
                    fill={colors.grayscale100}
                  />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default IndexNavigator;
