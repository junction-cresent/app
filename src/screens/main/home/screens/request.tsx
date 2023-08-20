import type { HomeStackParamList } from "../stack";
import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";

const Request = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();
  const route = useRoute<RouteProp<HomeStackParamList, "Request">>();

  console.log(route.params.data);

  return (
    <View style={styles.matching.container}>
      <View style={styles.page.reContainer}>
        <View style={styles.page.window}>
          <View style={styles.page.windowHeader}>
            <Text style={styles.page.windowOrangeTitle}>
              We sent the request to {route.params.data.name}
            </Text>
            <View
              style={[styles.page.windowLine, styles.page.windowOrangeLine]}
            />
          </View>
          <View style={styles.page.content}>
            <Text style={styles.page.contentOrangeText}>
              If{" "}
              <Text style={styles.page.contentOrangeTextHighlight}>
                {route.params.data.name} accepts
              </Text>{" "}
              the request, we will{" "}
              <Text style={styles.page.contentOrangeTextHighlight}>
                notify you
              </Text>{" "}
              via the app.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.matching.button}
          onPress={() => {
            navigation.replace("HomeStack", {
              screen: "Accepted",
              params: {
                data: route.params.data,
              },
            });
          }}>
          <Text style={styles.matching.buttonText}>Understood</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Request;
