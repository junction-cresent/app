import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import ChatData from "@app/resources/data/chat.json";
import UsersData from "@app/resources/data/users.json";
import profile from "@app/resources/images/profile";

const Chat = () => {
  const { colors, styles } = React.useContext(ThemeContext);

  return (
    <View style={styles.global.container}>
      <ScrollView>
        <View style={styles.index.container}>
          <View style={styles.index.header}>
            <View style={styles.index.headerContent}>
              <Text style={styles.index.headerTitleText}>Chat</Text>
            </View>
            <TouchableOpacity style={styles.index.button}>
              <SvgIcon name="AddSvg" fill={colors.grayscale200} />
            </TouchableOpacity>
          </View>
          <View style={styles.index.search}>
            <SvgIcon name="SearchSvg" fill={colors.grayscale100} />
            <TextInput
              style={styles.index.searchInput}
              placeholder="Search"
              placeholderTextColor={colors.grayscale500}
            />
          </View>
          <View style={styles.chat.list}>
            {Object.entries(ChatData).map(([key, value]) => (
              <Item
                key={key}
                id={key}
                user={UsersData[value.user]}
                preview={value.chats[value.chats.length - 1].data}
                unread={value.unread}
                lastTime={value.lastTime}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

interface ItemProps {
  id: string;
  user: (typeof UsersData)[keyof typeof UsersData];
  preview: string;
  unread: number;
  lastTime: string;
}
const Item: React.FC<ItemProps> = ({ id, user, preview, unread, lastTime }) => {
  const { styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  return (
    <TouchableOpacity
      style={styles.chat.item}
      onPress={() => {
        navigation.navigate("ChatStack", {
          screen: "Chat",
          params: {
            data: ChatData[id],
          },
        });
      }}>
      <Image
        style={styles.chat.profile}
        source={profile[user.profile]}
        resizeMode="cover"
      />
      <View style={styles.chat.content}>
        <Text style={styles.chat.name}>{user.name}</Text>
        <View style={styles.chat.preview}>
          <Text
            numberOfLines={1}
            style={
              unread > 0 ? styles.chat.unreadChat : styles.chat.previewText
            }>
            {preview}
          </Text>
          <View style={styles.chat.dot} />
          <Text style={styles.chat.previewText}>{lastTime}</Text>
        </View>
      </View>
      {unread > 0 && (
        <View style={styles.chat.unread}>
          <Text style={styles.chat.unreadText}>{unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Chat;
