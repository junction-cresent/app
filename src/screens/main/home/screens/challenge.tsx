import type { HomeStackParamList } from "../stack";
import type { MainStackNavigationProps } from "@app/screens/main";

import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { SvgIcon, Text } from "@app/components";
import { ThemeContext } from "@app/context/theme";
import UsersData from "@app/resources/data/users.json";
import challenge from "@app/resources/images/challenge";

const Challenge = () => {
  const { colors, styles, getHexOpacity } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();
  const route = useRoute<RouteProp<HomeStackParamList, "Detail">>();

  const [otherSelected, setOtherSelected] = React.useState<boolean>(false);
  const otherPostion = React.useRef(new Animated.Value(0)).current;
  const otherOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(otherOpacity, {
      toValue: otherSelected ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(otherPostion, {
      toValue: otherSelected ? 0 : 30,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [otherSelected]);

  const [mySelected, setMySelected] = React.useState<boolean>(false);
  const myPostion = React.useRef(new Animated.Value(0)).current;
  const myOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(myOpacity, {
      toValue: mySelected ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(myPostion, {
      toValue: mySelected ? 0 : 30,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [mySelected]);

  return (
    <View style={styles.detail.container}>
      <View style={[styles.page.headerFloating, styles.detail.headerFloating]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgIcon name="BackArrowSvg" fill={colors.purple300} />
        </TouchableOpacity>
        <View style={styles.page.headerButtons}>
          <TouchableOpacity
            style={[styles.page.headerButton, styles.challenges.headerButton]}>
            <SvgIcon name="SearchSvg" fill={colors.purple300} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.page.headerButton, styles.challenges.headerButton]}>
            <SvgIcon name="GpsSvg" fill={colors.purple300} />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require("@app/resources/images/map.png")}
        style={styles.detail.image}
        resizeMode="cover"
      />
      <View style={styles.challenge.me} />
      <TouchableOpacity
        style={styles.challenge.marker}
        onPress={() => {
          setMySelected(false);
          setOtherSelected(!otherSelected);
        }}>
        <SvgIcon
          name="MarkerSvg"
          fill={
            otherSelected || mySelected ? colors.purple100 : colors.purple900
          }
        />
      </TouchableOpacity>
      <View
        style={[
          styles.challenge.window,
          otherSelected && styles.challenge.windowActive,
        ]}>
        <Animated.View
          style={[
            styles.challenge.box,
            {
              opacity: otherOpacity,
              transform: [{ translateY: otherPostion }],
            },
          ]}>
          <Text style={styles.challenge.boxName}>Nazuna’s Answer</Text>
          <View style={styles.challenge.info}>
            <View style={styles.challenge.profile} />
            <View style={styles.challenge.mix}>
              <Text style={styles.challenge.name}>BBQ Fried Chicken</Text>
              <Text style={styles.challenge.address}>
                97, Centum jungang-ro, Haeundae-gu, Busan
              </Text>
            </View>
          </View>
          <Text style={styles.challenge.content}>
            When I was young, my grandfather often took me there and bought me a
            fried chicken. It still remains nostalgic for me.
          </Text>
          <View style={styles.challenge.images}>
            <View style={styles.challenge.image} />
            <View style={styles.challenge.image} />
            <View style={styles.challenge.image} />
          </View>
          <TouchableOpacity
            style={styles.challenge.action}
            onPress={() => {
              setMySelected(true);
              setOtherSelected(false);
            }}>
            <View style={styles.challenge.line} />
            <SvgIcon name="RightArrowSvg" fill={colors.purple700} />
            <View style={styles.challenge.button}>
              <SvgIcon name="VoteSvg" fill={colors.purple100} />
              <Text style={styles.challenge.buttonText}>Vote</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View
        style={[
          styles.challenge.window,
          mySelected && styles.challenge.windowActive,
        ]}>
        <Animated.View
          style={[
            styles.challenge.box,
            {
              opacity: myOpacity,
              transform: [{ translateY: myPostion }],
            },
          ]}>
          <Text style={styles.challenge.boxName}>Your Submission</Text>
          <View style={styles.challenge.info}>
            <View style={styles.challenge.profile} />
            <View style={styles.challenge.mix}>
              <Text style={styles.challenge.name}>BBQ Fried Chicken</Text>
              <Text style={styles.challenge.address}>
                97, Centum jungang-ro, Haeundae-gu, Busan
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.challenge.button}>
            <SvgIcon name="MediaSvg" fill={colors.purple100} />
            <Text style={styles.challenge.buttonText}>Add photos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.challenge.action}
            onPress={() => {
              navigation.navigate("HomeStack", {
                screen: "Reward",
              });
            }}>
            <View style={styles.challenge.line} />
            <SvgIcon name="RightArrowSvg" fill={colors.purple700} />
            <View style={styles.challenge.button}>
              <SvgIcon name="CheckSvg" fill={colors.purple100} />
              <Text style={styles.challenge.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default Challenge;
