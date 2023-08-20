import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { SplashContext } from "@app/context/splash";
import { ThemeContext } from "@app/context/theme";

const Home = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  const { loaded } = React.useContext(SplashContext);

  React.useEffect(() => {
    loaded();
  }, []);

  return (
    <View style={styles.global.container}>
      <ScrollView>
        <View style={styles.index.container}>
          <View style={styles.index.header}>
            <View style={styles.index.headerContent}>
              <Text style={styles.index.headerCurrent}>Current location</Text>
              <TouchableOpacity style={styles.index.headerTitle}>
                <Text style={styles.index.headerTitleText}>Busan, Bexco</Text>
                <SvgIcon name="CurrentLocationSvg" fill={colors.grayscale200} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.index.button}>
              <SvgIcon name="NotificationSvg" fill={colors.grayscale200} />
            </TouchableOpacity>
          </View>
          <View style={styles.home.section}>
            <Text style={styles.home.sectionTitle}>Recent Activity</Text>
            <View style={styles.home.dashedBox}>
              <View style={styles.home.archivementRow}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                  (row) => (
                    <View key={row} style={styles.home.archivementColumn}>
                      {[1, 2, 3, 4].map((column) => (
                        <View key={column} style={styles.home.achievement} />
                      ))}
                    </View>
                  ),
                )}
              </View>
            </View>
          </View>
          <View style={styles.home.section}>
            <Text style={styles.home.sectionTitle}>Seed</Text>
            <View style={styles.home.dashedBox}>
              <View style={styles.home.seed}>
                <Text style={styles.home.seedText}>3,600P</Text>
                <TouchableOpacity style={styles.home.seedCharge}>
                  <Text style={styles.home.seedChargeText}>Charge</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.home.grid}>
            <View style={styles.home.gridRow}>
              <TouchableOpacity
                style={[styles.home.gridItem, styles.home.gridItemOrange]}
                onPress={() => {
                  navigation.navigate("HomeStack", {
                    screen: "Matching",
                  });
                }}>
                <Text style={styles.home.gridOrangeTitle}>Matching</Text>
                <Text style={styles.home.gridOrangeDescription}>
                  Match your perfect{"\n"}foodmate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.home.gridItem, styles.home.gridItemYellow]}
                onPress={() => {
                  navigation.navigate("HomeStack", {
                    screen: "Grouping",
                  });
                }}>
                <Text style={styles.home.gridYellowTitle}>Grouping</Text>
                <Text style={styles.home.gridYellowDescription}>
                  Group together{"\n"}by your favorite food
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.home.gridItem, styles.home.gridItemPurple]}
              onPress={() => {
                navigation.navigate("HomeStack", {
                  screen: "Challenges",
                });
              }}>
              <Text style={styles.home.gridPurpleTitle}>Challenges</Text>
              <Text style={styles.home.gridPurpleDescription}>
                Submit your challenge and get the rewards!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
