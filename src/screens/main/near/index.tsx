import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import PlacesData from "@app/resources/data/places.json";
import place from "@app/resources/images/place";

const Near = () => {
  const { colors, styles } = React.useContext(ThemeContext);

  return (
    <View style={styles.global.container}>
      <ScrollView>
        <View style={styles.index.container}>
          <View style={styles.index.header}>
            <View style={styles.index.headerContent}>
              <Text style={styles.index.headerTitleText}>Near</Text>
            </View>
            <TouchableOpacity style={styles.index.button}>
              <SvgIcon name="FilterSvg" fill={colors.grayscale200} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.index.button}>
              <SvgIcon name="LocationSvg" fill={colors.grayscale200} />
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
          <View style={styles.near.list}>
            {Object.entries(PlacesData).map(([key, value]) => (
              <Item key={key} item={value} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

interface ItemProps {
  item: (typeof PlacesData)[keyof typeof PlacesData];
}
const Item: React.FC<ItemProps> = ({ item }) => {
  const { colors, styles } = React.useContext(ThemeContext);

  const comma = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.near.item}>
      <View style={styles.near.info}>
        <Text style={styles.near.name}>{item.name}</Text>
        <Text style={styles.near.address}>{item.address}</Text>
      </View>
      <View style={styles.near.tags}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.near.tag}>
            <Text style={styles.near.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.near.images}>
        {item.images.map((image, index) => (
          <Image
            key={index}
            style={styles.near.image}
            source={place[image]}
            resizeMode="cover"
          />
        ))}
      </View>
      <View style={styles.challenges.statistics}>
        <View style={styles.challenges.statistic}>
          <SvgIcon name="ClockSvg" fill={colors.grayscale500} />
          <Text style={styles.challenges.statisticText}>Available</Text>
        </View>
        <View style={styles.challenges.statistic}>
          <SvgIcon name="DistanceSvg" fill={colors.grayscale500} />
          <Text style={styles.challenges.statisticText}>{item.distance}</Text>
        </View>
        <View style={styles.challenges.statistic}>
          <SvgIcon name="LikeSvg" fill={colors.grayscale500} />
          <Text style={styles.challenges.statisticText}>
            {comma(item.likes)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Near;
