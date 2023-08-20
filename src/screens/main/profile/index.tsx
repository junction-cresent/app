import React from "react";
import { ScrollView, View, TouchableOpacity, Image } from "react-native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import foodsData from "@app/resources/data/foods.json";
import placesData from "@app/resources/data/places.json";
import profileData from "@app/resources/data/profile.json";
import food from "@app/resources/images/food";
import place from "@app/resources/images/place";
import profile from "@app/resources/images/profile";

const Profile = () => {
  const { colors, styles } = React.useContext(ThemeContext);

  return (
    <View style={styles.global.container}>
      <ScrollView>
        <View style={[styles.index.container, styles.profile.container]}>
          <View style={[styles.index.header, styles.profile.header]}>
            <View style={styles.index.headerContent}>
              <Text style={styles.index.headerTitleText}>Profile</Text>
            </View>
            <TouchableOpacity style={styles.index.button}>
              <SvgIcon name="SettingsSvg" fill={colors.grayscale200} />
            </TouchableOpacity>
          </View>
          <View style={styles.profile.info}>
            <Image
              source={profile[profileData.profile]}
              style={styles.profile.profile}
              resizeMode="cover"
            />
            <View style={styles.profile.mix}>
              <Text style={styles.profile.name}>{profileData.name}</Text>
              <Text style={styles.profile.id}>@{profileData.id}</Text>
            </View>
          </View>
          <View style={styles.profile.tags}>
            {profileData.tags.map((tag, index) => (
              <View key={index} style={styles.profile.tag}>
                <Text style={styles.profile.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.profile.pages}>
            <Text style={styles.profile.pageActive}>Info</Text>
            <Text style={styles.profile.page}>Posts</Text>
            <Text style={styles.profile.page}>Followers</Text>
          </View>
          <View style={styles.profile.section}>
            <TouchableOpacity style={styles.profile.sectionHeader}>
              <Text style={styles.profile.sectionTitle}>Quote</Text>
              <View style={styles.profile.sectionLine} />
              <SvgIcon name="RightArrowSvg" fill={colors.grayscale600} />
            </TouchableOpacity>
            <Text style={styles.profile.text}>“{profileData.quote}”</Text>
          </View>
          <View style={styles.profile.section}>
            <TouchableOpacity style={styles.profile.sectionHeader}>
              <Text style={styles.profile.sectionTitle}>Favorite Foods</Text>
              <View style={styles.profile.sectionLine} />
              <SvgIcon name="RightArrowSvg" fill={colors.grayscale600} />
            </TouchableOpacity>
            <View style={styles.profile.list}>
              {profileData.foods.map((foodId, index) => (
                <View key={index} style={styles.profile.food}>
                  <Image
                    source={food[foodsData[foodId].image]}
                    style={styles.profile.foodProfile}
                    resizeMode="cover"
                  />
                  <Text style={styles.profile.foodName}>
                    {foodsData[foodId].name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.profile.section}>
            <TouchableOpacity style={styles.profile.sectionHeader}>
              <Text style={styles.profile.sectionTitle}>
                Favorite Restaurants
              </Text>
              <View style={styles.profile.sectionLine} />
              <SvgIcon name="RightArrowSvg" fill={colors.grayscale600} />
            </TouchableOpacity>
            <View style={styles.profile.list}>
              {profileData.places.map((placeId, index) => (
                <View key={index} style={styles.profile.place}>
                  <Image
                    source={place[placesData[placeId].images[0]]}
                    style={styles.profile.placeProfile}
                    resizeMode="cover"
                  />
                  <View style={styles.profile.placeMix}>
                    <Text style={styles.profile.placeName}>
                      {placesData[placeId].name}
                    </Text>
                    <Text style={styles.profile.placeAddress}>
                      {placesData[placeId].address}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
