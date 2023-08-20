import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";

const Grouping = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  return (
    <View style={styles.grouping.container}>
      <View style={styles.page.reContainer}>
        <View style={styles.page.window}>
          <View style={styles.page.windowHeader}>
            <Text style={styles.page.windowYellowTitle}>
              Before using the food group
            </Text>
            <View
              style={[styles.page.windowLine, styles.page.windowYellowLine]}
            />
          </View>
          <View style={styles.page.content}>
            <Text style={styles.page.contentYellowText}>
              Please choose{" "}
              <Text style={styles.page.contentYellowTextHighlight}>
                what food
              </Text>{" "}
              you want to eat or{" "}
              <Text style={styles.page.contentYellowTextHighlight}>
                which restaurant
              </Text>{" "}
              would you like to eat.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.grouping.button}
          onPress={() => {
            navigation.navigate("HomeStack", {
              screen: "Choosing",
            });
          }}>
          <SvgIcon name="RiceSvg" fill={colors.yellow900} />
          <Text style={styles.grouping.buttonText}>
            Choose food or restaurant
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Grouping;
