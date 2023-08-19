import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { ScrollView, View, TouchableOpacity, TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "@app/context/theme";
import ChatData from "@app/resources/data/chat.json";
import { SvgIcon, Text } from "@root/src/components";

const Chat = () => {
  const { colors, styles } = React.useContext(ThemeContext);

  return (
    <View style={styles.global.container}>
      <ScrollView>
        <View style={styles.index.container}>
          <Text style={styles.index.title}>Chat</Text>
          <View style={styles.chat.menu}>
            <View style={styles.chat.search}>
              <SvgIcon name="SearchSvg" fill={colors.grayscale100} />
              <TextInput
                style={styles.chat.searchInput}
                placeholder="Search"
                placeholderTextColor={colors.grayscale500}
              />
            </View>
            <TouchableOpacity style={styles.chat.add}>
              <SvgIcon name="ChatAddSvg" fill={colors.grayscale900} />
            </TouchableOpacity>
          </View>
          <View style={styles.chat.list}>
            {Object.entries(ChatData).map(([key, value]) => (
              <Item
                key={key}
                id={key}
                name={value.name}
                preview={value.chats[0].data}
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
  name: string;
  preview: string;
  unread: number;
  lastTime: string;
}
const Item: React.FC<ItemProps> = ({ id, name, preview, unread, lastTime }) => {
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
      <View style={styles.chat.profile} />
      <View style={styles.chat.content}>
        <Text style={styles.chat.name}>{name}</Text>
        <View style={styles.chat.preview}>
          <Text
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
