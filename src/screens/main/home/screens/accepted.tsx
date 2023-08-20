import type { HomeStackParamList } from "../stack";
import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import profile from "@app/resources/images/profile";

const Accepted = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();
  const route = useRoute<RouteProp<HomeStackParamList, "Request">>();

  console.log(route.params.data);

  return (
    <View style={styles.matching.container}>
      <View style={styles.page.reContainer}>
        <View style={styles.page.window}>
          <View style={styles.page.windowHeader}>
            <Text style={styles.page.windowOrangeTitle}>Good Job!</Text>
            <View
              style={[styles.page.windowLine, styles.page.windowOrangeLine]}
            />
          </View>
          <View style={styles.page.content}>
            <Text style={styles.page.contentOrangeText}>
              <Text style={styles.page.contentOrangeTextHighlight}>
                Now you are matched with...
              </Text>
            </Text>
            <View style={styles.matching.accepted}>
              <Image
                source={profile[route.params.data.profile]}
                style={styles.matching.acceptedProfile}
              />
              <Text style={styles.matching.acceptedName}>
                {route.params.data.name}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.matching.button}
          onPress={() => {
            navigation.replace("HomeStack", {
              screen: "Go",
              params: {
                data: route.params.data,
              },
            });
          }}>
          <Text style={styles.matching.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Accepted;
