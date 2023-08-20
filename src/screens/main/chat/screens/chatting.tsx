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
  Pressable,
  Keyboard,
  Animated,
} from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import UsersData from "@app/resources/data/users.json";
import profile from "@app/resources/images/profile";

const Chatting = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const route = useRoute<RouteProp<ChatStackParamList, "Chat">>();
  const navigation = useNavigation<MainStackNavigationProps>();

  const [isFocus, setIsFocus] = React.useState(false);
  const [menu, setMenu] = React.useState(false);

  const overOpacity = React.useRef(new Animated.Value(0)).current;
  const overPosition = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (menu) Keyboard.dismiss();
    Animated.timing(overOpacity, {
      toValue: menu ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(overPosition, {
      toValue: menu ? 0 : 30,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [menu]);

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
              style={[styles.chatting.button, styles.chatting.add]}
              onPress={() => {
                setMenu(!menu);
              }}>
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
          <Pressable
            style={[styles.chatting.over, menu && styles.chatting.overActive]}
            onPress={() => {
              setMenu(false);
            }}>
            <Animated.View
              style={[
                styles.chatting.overInner,
                {
                  opacity: overOpacity,
                  transform: [{ translateY: overPosition }],
                },
              ]}>
              <TouchableOpacity style={styles.chatting.overItem}>
                <View style={styles.chatting.overButton}>
                  <SvgIcon name="AppointmentSvg" fill={colors.grayscale100} />
                </View>
                <Text style={styles.chatting.overButtonText}>
                  Food Appointment
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatting.overItem}>
                <View style={styles.chatting.overButton}>
                  <SvgIcon name="MediaSvg" fill={colors.grayscale100} />
                </View>
                <Text style={styles.chatting.overButtonText}>
                  Photos & Videos
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Chatting;
