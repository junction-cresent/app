import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "@app/context/theme";
import { SvgIcon, Text } from "@root/src/components";

const Chat = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <View style={styles.global.container}>
      <View style={styles.chatPage.container}>
        <KeyboardAvoidingView
          style={styles.chatPage.keyboard}
          behavior="padding">
          <View style={styles.page.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <SvgIcon name="BackArrowSvg" fill={colors.grayscale300} />
            </TouchableOpacity>
          </View>
          <View style={styles.chatPage.user}>
            <View style={styles.chatPage.profile} />
            <Text style={styles.chatPage.name}>Nazuna</Text>
          </View>
          <ScrollView style={styles.chatPage.scroll} />
          <View
            style={[
              styles.chatPage.chat,
              isFocus && styles.chatPage.chatKeyboard,
            ]}>
            <TouchableOpacity
              style={[styles.chatPage.button, styles.chatPage.add]}>
              <SvgIcon name="ChatAddSvg" fill={colors.grayscale900} />
            </TouchableOpacity>
            <View style={styles.chatPage.search}>
              <TextInput
                style={styles.chatPage.searchInput}
                placeholder="Enter Message"
                placeholderTextColor={colors.grayscale500}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
            </View>
            <TouchableOpacity
              style={[styles.chatPage.button, styles.chatPage.send]}>
              <SvgIcon name="ChatSendSvg" fill={colors.grayscale100} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Chat;
