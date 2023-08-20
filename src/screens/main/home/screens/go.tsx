import type { HomeStackParamList } from "../stack";
import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import ChatData from "@app/resources/data/chat.json";
import profile from "@app/resources/images/profile";

const Go = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();
  const route = useRoute<RouteProp<HomeStackParamList, "Request">>();

  return (
    <View style={styles.matching.container}>
      <View style={styles.page.reContainer}>
        <View style={styles.page.window}>
          <View style={styles.page.windowHeader}>
            <Text style={styles.page.windowOrangeTitle}>
              Now you are matched with {route.params.data.name}
            </Text>
            <View
              style={[styles.page.windowLine, styles.page.windowOrangeLine]}
            />
          </View>
          <View style={styles.page.content}>
            <Text style={styles.page.contentOrangeText}>
              We opened{" "}
              <Text style={styles.page.contentOrangeTextHighlight}>
                a chat session
              </Text>{" "}
              for you. Now you can{" "}
              <Text style={styles.page.contentOrangeTextHighlight}>
                chat with {route.params.data.name}
              </Text>{" "}
              and{" "}
              <Text style={styles.page.contentOrangeTextHighlight}>
                make an food appoinment
              </Text>
              .
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.matching.button}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "IndexStack", params: { screen: "Chat" } }],
            });
          }}>
          <Text style={styles.matching.buttonText}>Go to chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Go;
