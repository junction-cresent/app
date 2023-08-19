import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import { View, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";

import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "@app/context/theme";
import { SvgIcon, Text } from "@root/src/components";

const Matching = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  const [height, setHeight] = React.useState(0);

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
            data={[1, 2, 3, 4, 5]}
            renderItem={() => (
              <View
                style={[
                  styles.matching.snapItem,
                  {
                    height: height,
                  },
                ]}>
                <Card />
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

const Card = () => {
  const { styles } = React.useContext(ThemeContext);

  return (
    <View style={styles.matching.card}>
      <View style={styles.matching.info}>
        <View style={styles.matching.user}>
          <View style={styles.matching.profile} />
          <Text style={styles.matching.name}>Nazuna</Text>
          <View style={styles.matching.line} />
        </View>
        <Text style={styles.matching.introducing}>
          “I like korean foods. Let’s eat together!”
        </Text>
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
