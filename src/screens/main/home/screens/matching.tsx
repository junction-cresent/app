import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

import { useNavigation } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import MatchingData from "@app/resources/data/matching.json";
import usersData from "@app/resources/data/users.json";
import profile from "@app/resources/images/profile";

const Matching = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  const [height, setHeight] = React.useState(0);

  const data = Object.entries(MatchingData).map(([key, value]) => {
    return {
      id: key,
      ...value,
    };
  });

  console.log(data);

  return (
    <View style={styles.matching.container}>
      <View style={styles.page.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgIcon name="BackArrowSvg" fill={colors.orange300} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.page.headerButton, styles.matching.headerButton]}>
          <SvgIcon name="FilterSvg" fill={colors.orange300} />
        </TouchableOpacity>
      </View>
      <View style={styles.matching.menus}>
        <TouchableOpacity style={styles.matching.menu}>
          <SvgIcon name="LocationSvg" fill={colors.orange100} />
          <Text style={styles.matching.menuText}>Relocate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.matching.menu}>
          <SvgIcon name="RefreshSvg" fill={colors.orange100} />
          <Text style={styles.matching.menuText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.matching.snap}
        onLayout={(event) => {
          setHeight(event.nativeEvent.layout.height);
        }}>
        {height > 0 && (
          <Carousel
            vertical
            data={data}
            renderItem={(data) => (
              <View
                style={[
                  styles.matching.snapItem,
                  {
                    height: height,
                  },
                ]}>
                <Card
                  id={data.item.id}
                  introducing={data.item.introducing}
                  user={usersData[data.item.user]}
                />
                <View style={styles.matching.snapInfo}>
                  <SvgIcon name="DownArrowSvg" fill={colors.orange500} />
                  <Text style={styles.matching.snapText}>
                    Swipe down to check more people
                  </Text>
                </View>
              </View>
            )}
            sliderHeight={height}
            itemHeight={height}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            useScrollView
            onScrollIndexChanged={(index) => {
              console.log(index);
            }}
          />
        )}
      </View>
      <TouchableOpacity style={styles.matching.button}>
        <Text style={styles.matching.buttonText}>Send Match Request</Text>
      </TouchableOpacity>
    </View>
  );
};

interface CardProps {
  id: string;
  introducing: string;
  user: (typeof usersData)[keyof typeof usersData];
}
const Card: React.FC<CardProps> = ({ id, introducing, user }) => {
  const { styles } = React.useContext(ThemeContext);

  return (
    <View style={styles.matching.card}>
      <View style={styles.matching.info}>
        <View style={styles.matching.user}>
          <Image
            style={styles.matching.profile}
            source={profile[user.profile]}
            resizeMode="cover"
          />
          <Text style={styles.matching.name}>{user.name}</Text>
          <View style={styles.matching.line} />
        </View>
        <Text style={styles.matching.introducing}>“{introducing}”</Text>
        <View style={styles.matching.tags}>
          <View style={styles.matching.tag}>
            <Text style={styles.matching.tagText}>Spicy Lover</Text>
          </View>
          <View style={styles.matching.tag}>
            <Text style={styles.matching.tagText}>Korean Food Lover</Text>
          </View>
        </View>
      </View>
      <View style={styles.matching.section}>
        <Text style={styles.matching.sectionTitle}>Favorite Restaurant</Text>
        <View style={styles.matching.place}>
          <View style={styles.matching.placeProfile} />
          <View style={styles.matching.placeInfo}>
            <Text style={styles.matching.placeName}>까치네</Text>
            <Text style={styles.matching.placeAddress}>
              18, Cheongpa-ro 45-gil, Yongsan-gu, Seoul
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.matching.section}>
        <Text style={styles.matching.sectionTitle}>Favorite Menu</Text>
        <View style={styles.matching.food}>
          <View style={styles.matching.foodProfile} />
          <Text style={styles.matching.foodName}>Tofu Stew</Text>
        </View>
      </View>
    </View>
  );
};

export default Matching;
