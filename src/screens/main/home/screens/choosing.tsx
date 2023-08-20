import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import FoodsData from "@app/resources/data/foods.json";
import PlacesData from "@app/resources/data/places.json";
import food from "@app/resources/images/food";
import place from "@app/resources/images/place";

const Choosing = () => {
  const { colors, styles } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  return (
    <View style={styles.grouping.container}>
      <View style={styles.page.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgIcon name="BackArrowSvg" fill={colors.purple300} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.grouping.scroll}>
        <View style={styles.grouping.content}>
          <View style={styles.grouping.search}>
            <SvgIcon name="SearchSvg" fill={colors.yellow100} />
            <TextInput
              style={styles.grouping.searchInput}
              placeholder="Search"
              placeholderTextColor={colors.yellow500}
            />
          </View>
          <View style={styles.grouping.section}>
            <Text style={styles.grouping.sectionTitle}>Recent Restaurants</Text>
            <View style={styles.grouping.list}>
              {Object.entries(PlacesData).map(
                ([key, value]) =>
                  Object.keys(PlacesData).indexOf(key) < 2 && (
                    <TouchableOpacity
                      key={key}
                      style={styles.grouping.food}
                      onPress={() => {
                        navigation.navigate("HomeStack", {
                          screen: "Group",
                        });
                      }}>
                      <Image
                        source={place[value.images[0]]}
                        style={styles.grouping.placeProfile}
                      />
                      <View style={styles.grouping.mix}>
                        <Text style={styles.grouping.foodName}>
                          {value.name}
                        </Text>
                        <Text style={styles.grouping.foodAddress}>
                          {value.address}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ),
              )}
            </View>
          </View>
          <View style={styles.grouping.section}>
            <Text style={styles.grouping.sectionTitle}>Recent Foods</Text>
            <View style={styles.grouping.list}>
              {Object.entries(FoodsData).map(
                ([key, value]) =>
                  Object.keys(FoodsData).indexOf(key) < 2 && (
                    <TouchableOpacity
                      key={key}
                      style={styles.grouping.food}
                      onPress={() => {
                        navigation.navigate("HomeStack", {
                          screen: "Group",
                        });
                      }}>
                      <Image
                        source={food[value.image]}
                        style={styles.grouping.foodProfile}
                      />
                      <View style={styles.grouping.mix}>
                        <Text style={styles.grouping.foodName}>
                          {value.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ),
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Choosing;
