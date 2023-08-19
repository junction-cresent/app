import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity, ScrollView, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import ChallengesData from "@app/resources/data/challenges.json";
import UsersData from "@app/resources/data/users.json";
import challenge from "@app/resources/images/challenge";

const Challenges = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  return (
    <View style={styles.challenges.container}>
      <View style={styles.page.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgIcon name="BackArrowSvg" fill={colors.purple300} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.page.headerButton, styles.challenges.headerButton]}>
          <SvgIcon name="FilterSvg" fill={colors.purple300} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.challenges.scroll}>
        <TouchableOpacity style={styles.challenges.button}>
          <SvgIcon name="TrophySvg" fill={colors.purple100} />
          <Text style={styles.challenges.buttonText}>My Challenges</Text>
        </TouchableOpacity>
        <View style={styles.challenges.content}>
          <Text style={styles.challenges.title}>
            This week’s Top 3 Challenges
          </Text>
          <View style={styles.challenges.list}>
            {Object.entries(ChallengesData).map(([key, value]) => {
              return <Item key={key} item={value} user={UsersData[value.by]} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

interface ItemProps {
  item: (typeof ChallengesData)[keyof typeof ChallengesData];
  user: (typeof UsersData)[keyof typeof UsersData];
}
const Item: React.FC<ItemProps> = ({ item, user }) => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  const comma = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <TouchableOpacity
      style={styles.challenges.item}
      onPress={() => {
        navigation.navigate("HomeStack", {
          screen: "Detail",
          params: {
            data: item,
          },
        });
      }}>
      <Image
        style={styles.challenges.thumbnail}
        source={challenge[item.image]}
        resizeMode="cover"
      />
      <View style={styles.challenges.info}>
        <Text style={styles.challenges.name}>{item.name}</Text>
        <View style={styles.challenges.by}>
          <Text style={styles.challenges.byText}>Challenge by</Text>
          <Text style={styles.challenges.byUser}>{user.name}</Text>
        </View>
      </View>
      <View style={styles.challenges.statistics}>
        <View style={styles.challenges.statistic}>
          <SvgIcon name="UserSvg" fill={colors.purple500} />
          <Text style={styles.challenges.statisticText}>
            {comma(item.users)}
          </Text>
        </View>
        <View style={styles.challenges.statistic}>
          <SvgIcon name="LikeSvg" fill={colors.purple500} />
          <Text style={styles.challenges.statisticText}>
            {comma(item.likes)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Challenges;
