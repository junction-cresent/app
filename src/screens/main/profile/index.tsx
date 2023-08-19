import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";

const Profile = () => {
  const { colors, styles } = React.useContext(ThemeContext);

  return (
    <View style={styles.global.container}>
      <ScrollView>
        <View style={styles.index.container}>
          <View style={styles.index.header}>
            <View style={styles.index.headerContent}>
              <Text style={styles.index.headerTitleText}>Profile</Text>
            </View>
            <TouchableOpacity style={styles.index.button}>
              <SvgIcon name="SettingsSvg" fill={colors.grayscale200} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
