import type { ChatStackParamList } from "../stack";
import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import UsersData from "@app/resources/data/users.json";
import profile from "@app/resources/images/profile";

const Chat = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const route = useRoute<RouteProp<ChatStackParamList, "Chat">>();
  const navigation = useNavigation<MainStackNavigationProps>();

  const [isFocus, setIsFocus] = React.useState(false);

  console.log(route.params.data);

  return (
    <View style={styles.global.container}>
      <View style={styles.chatting.container}>
        <KeyboardAvoidingView
          style={styles.chatting.keyboard}
          behavior="padding">
          <View style={styles.page.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <SvgIcon name="BackArrowSvg" fill={colors.grayscale300} />
            </TouchableOpacity>
          </View>
          <View style={styles.chatting.user}>
            <Image
              style={styles.chatting.profile}
              source={profile[UsersData[route.params.data.user].profile]}
              resizeMode="cover"
            />
            <Text style={styles.chatting.name}>
              {UsersData[route.params.data.user].name}
            </Text>
          </View>
          <ScrollView style={styles.chatting.scroll}>
            <View style={styles.chatting.bubbles}>
              {route.params.data.chats.map((chat, index) => (
                <View
                  key={index}
                  style={
                    chat.me ? styles.chatting.bubbleMe : styles.chatting.bubble
                  }>
                  <Text
                    style={
                      chat.me
                        ? styles.chatting.bubbleMeText
                        : styles.chatting.bubbleText
                    }>
                    {chat.data}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <View
            style={[
              styles.chatting.chat,
              isFocus && styles.chatting.chatKeyboard,
            ]}>
            <TouchableOpacity
              style={[styles.chatting.button, styles.chatting.add]}>
              <SvgIcon name="AddSvg" fill={colors.grayscale900} />
            </TouchableOpacity>
            <View style={styles.chatting.search}>
              <TextInput
                style={styles.chatting.searchInput}
                placeholder="Enter Message"
                placeholderTextColor={colors.grayscale500}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
            </View>
            <TouchableOpacity
              style={[styles.chatting.button, styles.chatting.send]}>
              <SvgIcon name="ChatSendSvg" fill={colors.grayscale100} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Chat;
