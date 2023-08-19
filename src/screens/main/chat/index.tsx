import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { ScrollView, View, TouchableOpacity, TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "@app/context/theme";
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
            <Item name="Nazuna" preview="made a food appointment" count={0} />
            <Item
              name="Chizuru"
              preview="I also like korean foods too!"
              count={1}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

interface ItemProps {
  name: string;
  preview: string;
  count: number;
}
const Item: React.FC<ItemProps> = ({ name, preview, count }) => {
  const { styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  return (
    <TouchableOpacity
      style={styles.chat.item}
      onPress={() => {
        navigation.navigate("ChatStack", {
          screen: "Chat",
        });
      }}>
      <View style={styles.chat.profile} />
      <View style={styles.chat.content}>
        <Text style={styles.chat.name}>{name}</Text>
        <View style={styles.chat.preview}>
          <Text
            style={count > 0 ? styles.chat.unread : styles.chat.previewText}>
            {preview}
          </Text>
          <View style={styles.chat.dot} />
          <Text style={styles.chat.previewText}>2h</Text>
        </View>
      </View>
      {count > 0 && (
        <View style={styles.chat.count}>
          <Text style={styles.chat.countText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Chat;
