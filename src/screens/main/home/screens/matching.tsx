import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

import { useNavigation } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import FoodsData from "@app/resources/data/foods.json";
import MatchingData from "@app/resources/data/matching.json";
import PlacesData from "@app/resources/data/places.json";
import UsersData from "@app/resources/data/users.json";
import food from "@app/resources/images/food";
import place from "@app/resources/images/place";
import profile from "@app/resources/images/profile";

const Matching = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  const [height, setHeight] = React.useState(0);
  const [current, setCurrent] = React.useState(0);

  const arrayData = Object.entries(MatchingData).map(([key, value]) => {
    return {
      id: key,
      ...value,
    };
  });

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
            data={arrayData}
            renderItem={(data) => (
              <View
                style={[
                  styles.matching.snapItem,
                  {
                    height: height,
                  },
                ]}>
                <Card matching={data.item} user={UsersData[data.item.user]} />
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
              setCurrent(index);
            }}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.matching.button}
        onPress={() => {
          navigation.replace("HomeStack", {
            screen: "Request",
            params: {
              data: UsersData[arrayData[current].user],
            },
          });
        }}>
        <Text style={styles.matching.buttonText}>Send Match Request</Text>
      </TouchableOpacity>
    </View>
  );
};

interface CardProps {
  matching: (typeof MatchingData)[keyof typeof MatchingData];
  user: (typeof UsersData)[keyof typeof UsersData];
}
const Card: React.FC<CardProps> = ({ matching, user }) => {
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
        <Text style={styles.matching.introducing}>
          “{matching.introducing}”
        </Text>
        <View style={styles.matching.tags}>
          {matching.tags.map((tag, index) => (
            <View key={index} style={styles.matching.tag}>
              <Text style={styles.matching.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.matching.section}>
        <Text style={styles.matching.sectionTitle}>Favorite Restaurant</Text>
        <View style={styles.matching.place}>
          <Image
            source={place[PlacesData[matching.place].images[0]]}
            style={styles.matching.placeProfile}
            resizeMode="cover"
          />
          <View style={styles.matching.placeInfo}>
            <Text style={styles.matching.placeName}>
              {PlacesData[matching.place].name}
            </Text>
            <Text style={styles.matching.placeAddress}>
              {PlacesData[matching.place].address}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.matching.section}>
        <Text style={styles.matching.sectionTitle}>Favorite Menu</Text>
        <View style={styles.matching.food}>
          <Image
            source={food[FoodsData[matching.food].image]}
            style={styles.matching.foodProfile}
            resizeMode="cover"
          />
          <Text style={styles.matching.foodName}>
            {FoodsData[matching.food].name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Matching;
