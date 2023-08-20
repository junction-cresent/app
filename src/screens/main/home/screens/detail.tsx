import type { HomeStackParamList } from "../stack";
import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity, ScrollView, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import UsersData from "@app/resources/data/users.json";
import challenge from "@app/resources/images/challenge";

const Detail = () => {
  const { colors, styles, getHexOpacity } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();
  const route = useRoute<RouteProp<HomeStackParamList, "Detail">>();

  console.log(route.params.data);

  const comma = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.detail.container}>
      <View style={[styles.page.headerFloating, styles.detail.headerFloating]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgIcon name="BackArrowSvg" fill={colors.purple300} />
        </TouchableOpacity>
        <View style={styles.page.headerButtons}>
          <TouchableOpacity
            style={[styles.page.headerButton, styles.challenges.headerButton]}>
            <SvgIcon name="LikeButtonSvg" fill={colors.purple300} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detail.top}>
        <Text style={styles.detail.title}>{route.params.data.name}</Text>
        <View style={styles.detail.background}>
          <Image
            source={challenge[route.params.data.image]}
            style={styles.detail.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={[getHexOpacity(colors.purple900, 40), colors.purple900]}
            style={styles.detail.gradient}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.detail.content}>
          <View style={styles.detail.statistics}>
            <View style={styles.detail.statistic}>
              <Text style={styles.detail.statisticByText}>Challenge by</Text>
              <Text style={styles.detail.statisticText}>
                {UsersData[route.params.data.by].name}
              </Text>
            </View>
            <View style={styles.detail.statistic}>
              <SvgIcon name="UserSvg" fill={colors.purple500} />
              <Text style={styles.detail.statisticText}>
                {comma(route.params.data.users)}
              </Text>
            </View>
            <View style={styles.detail.statistic}>
              <SvgIcon name="LikeSvg" fill={colors.purple500} />
              <Text style={styles.detail.statisticText}>
                {comma(route.params.data.likes)}
              </Text>
            </View>
          </View>
          <View style={styles.detail.section}>
            <Text style={styles.detail.sectionTitle}>
              {route.params.data.title}
            </Text>
            <Text style={styles.detail.sectionDescription}>
              {route.params.data.description}
            </Text>
          </View>
          <View style={styles.detail.section}>
            <Text style={styles.detail.sectionTitle}>
              Challenge Requirement
            </Text>
            <Text style={styles.detail.sectionDescription}>
              {route.params.data.requirement.join("\n")}
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.detail.button}
        onPress={() => {
          navigation.navigate("HomeStack", {
            screen: "Challenge",
          });
        }}>
        <Text style={styles.detail.buttonText}>Accept Challenge</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;
