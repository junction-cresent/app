import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";

const Reward = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  return (
    <View style={styles.challenges.container}>
      <View style={styles.page.reContainer}>
        <View style={styles.page.window}>
          <View style={styles.page.windowHeader}>
            <Text style={styles.page.windowPurpleTitle}>Congrats!</Text>
            <View
              style={[styles.page.windowLine, styles.page.windowPurpleLine]}
            />
          </View>
          <View style={styles.page.content}>
            <Text style={styles.page.contentPurpleText}>
              You{" "}
              <Text style={styles.page.contentPurpleTextHighlight}>
                got reward
              </Text>{" "}
              for participating for the challenge. You got{" "}
              <Text style={styles.page.contentPurpleTextHighlight}>50P</Text>{" "}
              and{" "}
              <Text style={styles.page.contentPurpleTextHighlight}>
                special badge
              </Text>{" "}
              for reward.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.matching.button}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "IndexStack", params: { screen: "Profile" } }],
            });
          }}>
          <Text style={styles.matching.buttonText}>Go to profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reward;
