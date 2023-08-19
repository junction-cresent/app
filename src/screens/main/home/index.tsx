import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";

import { SplashContext } from "@app/context/splash";
import { ThemeContext } from "@app/context/theme";
import { SvgIcon, Text } from "@root/src/components";

const Home = () => {
  const { colors, styles } = React.useContext(ThemeContext);

  const { loaded } = React.useContext(SplashContext);

  React.useEffect(() => {
    loaded();
  }, []);

  return (
    <View style={styles.global.container}>
      <ScrollView>
        <View style={styles.index.container}>
          <View style={styles.home.top}>
            <View style={styles.home.topCurrent}>
              <Text style={styles.home.topCurrentTitle}>Current location</Text>
              <TouchableOpacity style={styles.home.topCurrentLocation}>
                <Text style={styles.home.topCurrentLocationText}>
                  Busan, Bexco
                </Text>
                <SvgIcon name="CurrentLocationSvg" fill={colors.grayscale200} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.home.notification}>
              <SvgIcon name="NotificationSvg" fill={colors.grayscale200} />
            </TouchableOpacity>
          </View>
          <View style={styles.home.section}>
            <Text style={styles.home.sectionTitle}>Achievements</Text>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
