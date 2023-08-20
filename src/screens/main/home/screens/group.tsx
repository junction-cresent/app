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
import FoodsData from "@app/resources/data/foods.json";
import PlacesData from "@app/resources/data/places.json";
import food from "@app/resources/images/food";
import place from "@app/resources/images/place";

const Group = () => {
  const { colors, styles, getHexOpacity } = React.useContext(ThemeContext);
  const navigation = useNavigation<MainStackNavigationProps>();

  const [egSelected, setEgSelected] = React.useState<boolean>(false);
  const egPostion = React.useRef(new Animated.Value(0)).current;
  const egOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(egOpacity, {
      toValue: egSelected ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(egPostion, {
      toValue: egSelected ? 0 : 30,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [egSelected]);

  const [group, setGroup] = React.useState<boolean>(false);
  const groupPostion = React.useRef(new Animated.Value(0)).current;
  const groupOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(groupOpacity, {
      toValue: group ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(groupPostion, {
      toValue: group ? 0 : 30,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [group]);

  const [groupChat, setGroupChat] = React.useState<boolean>(false);
  const groupChatPostion = React.useRef(new Animated.Value(0)).current;
  const groupChatOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(groupChatOpacity, {
      toValue: groupChat ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(groupChatPostion, {
      toValue: groupChat ? 0 : 30,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [groupChat]);

  const [ownGroup, setOwnGroup] = React.useState<boolean>(false);
  const ownGroupPostion = React.useRef(new Animated.Value(0)).current;
  const ownGroupOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(ownGroupOpacity, {
      toValue: ownGroup ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(ownGroupPostion, {
      toValue: ownGroup ? 0 : 30,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [ownGroup]);

  const [newGroup, setNewGroup] = React.useState<boolean>(false);
  const newGroupPostion = React.useRef(new Animated.Value(0)).current;
  const newGroupOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(newGroupOpacity, {
      toValue: newGroup ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(newGroupPostion, {
      toValue: newGroup ? 0 : 30,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [newGroup]);

  const [settings, setSettings] = React.useState<boolean>(false);
  const settingsPostion = React.useRef(new Animated.Value(0)).current;
  const settingsOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(settingsOpacity, {
      toValue: settings ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(settingsPostion, {
      toValue: settings ? 0 : 30,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [settings]);

  return (
    <View style={styles.detail.container}>
      <View
        style={[styles.page.headerFloating, styles.grouping.headerFloating]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <SvgIcon name="BackArrowSvg" fill={colors.yellow300} />
        </TouchableOpacity>
        <View style={styles.page.headerButtons}>
          <TouchableOpacity
            style={[styles.page.headerButton, styles.grouping.headerButton]}>
            <SvgIcon name="RiceSvg" fill={colors.yellow300} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.page.headerButton, styles.grouping.headerButton]}>
            <SvgIcon name="GpsSvg" fill={colors.yellow300} />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require("@app/resources/images/map.png")}
        style={styles.detail.image}
        resizeMode="cover"
      />
      <View style={styles.group.me} />
      <TouchableOpacity
        style={styles.group.marker}
        onPress={() => {
          if (group | ownGroup | newGroup | settings) return;
          setEgSelected(!egSelected);
        }}>
        <SvgIcon
          name="MarkerSvg"
          fill={
            egSelected
              ? colors.yellow100
              : group
              ? colors.yellow
              : colors.yellow900
          }
        />
      </TouchableOpacity>
      {!(group || egSelected || ownGroup || newGroup) && (
        <TouchableOpacity
          style={styles.group.newGroup}
          onPress={() => {
            setOwnGroup(true);
          }}>
          <SvgIcon name="AddSvg" fill={colors.yellow900} />
          <Text style={styles.group.newGroupText}>New Group</Text>
        </TouchableOpacity>
      )}
      <Animated.View
        style={[
          styles.group.window,
          egSelected && styles.group.windowActive,
          {
            opacity: egOpacity,
            transform: [{ translateY: egPostion }],
          },
        ]}>
        <TouchableOpacity
          style={styles.group.close}
          onPress={() => {
            setEgSelected(false);
          }}>
          <SvgIcon name="DownArrowSvg" fill={colors.yellow100} />
        </TouchableOpacity>
        <View style={styles.group.box}>
          <Text style={styles.group.boxTitle}>Nazuna’s group</Text>
          <Text style={styles.group.bigText}>
            Let’s eat sweet and sour pork together!
          </Text>
          <View style={styles.group.items}>
            <View style={styles.group.item}>
              <Image
                source={place[PlacesData["64e107383207e544b901bbff"].images[0]]}
                style={styles.group.itemProfile}
                resizeMode="cover"
              />
              <View style={styles.group.itemMix}>
                <Text style={styles.group.itemName}>
                  {PlacesData["64e107383207e544b901bbff"].name}
                </Text>
                <Text style={styles.group.itemAddress}>
                  {PlacesData["64e107383207e544b901bbff"].address}
                </Text>
              </View>
            </View>
            <View style={styles.group.item}>
              <Image
                source={food[FoodsData["64e142933207e544b901d83b"].image]}
                style={styles.group.itemProfileCircle}
                resizeMode="cover"
              />
              <View style={styles.group.itemMix}>
                <Text style={styles.group.itemName}>
                  {FoodsData["64e142933207e544b901d83b"].name}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.group.action}
            onPress={() => {
              setGroup(true);
              setEgSelected(false);
            }}>
            <View style={styles.group.line} />
            <SvgIcon name="RightArrowSvg" fill={colors.yellow700} />
            <View style={styles.group.button}>
              <SvgIcon name="JoinSvg" fill={colors.yellow100} />
              <Text style={styles.group.buttonText}>Join</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.group.window,
          group && styles.group.windowActive,
          {
            opacity: groupOpacity,
            transform: [{ translateY: groupPostion }],
          },
        ]}>
        <View style={styles.group.infoBox}>
          <Text style={styles.group.infoBoxDistance}>200m</Text>
          <Text style={styles.group.infoBoxDesc}>
            to the BEXCO Intersection crosswalk
          </Text>
        </View>
        <View style={styles.group.groupBoxs}>
          <TouchableOpacity
            style={[styles.group.groupBox, styles.group.groupBoxBlack]}
            onPress={() => {
              setGroup(false);
            }}>
            <Text style={styles.group.groupBoxTextBlack}>Nazuna’s Group</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.group.groupBox, styles.group.groupBoxWhite]}>
            <SvgIcon name="SendSvg" fill={colors.yellow900} />
            <Text style={styles.group.groupBoxTextWhite}>Group Chat</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.group.window,
          ownGroup && styles.group.windowActive,
          {
            opacity: ownGroupOpacity,
            transform: [{ translateY: ownGroupPostion }],
          },
        ]}>
        <TouchableOpacity
          style={styles.group.close}
          onPress={() => {
            setOwnGroup(false);
          }}>
          <SvgIcon name="DownArrowSvg" fill={colors.yellow100} />
        </TouchableOpacity>
        <View style={styles.group.box}>
          <Text style={styles.group.boxTitle}>New Group</Text>
          <Text style={styles.group.bigText}>New Group</Text>
          <View style={styles.group.items}>
            <TouchableOpacity
              style={[styles.group.action, styles.group.actionMan]}>
              <Text style={styles.group.actionText}>Place</Text>
              <View style={styles.group.line} />
              <SvgIcon name="RightArrowSvg" fill={colors.yellow700} />
            </TouchableOpacity>
            <View style={styles.group.item}>
              <Image
                source={place[PlacesData["64e107383207e544b901bbff"].images[0]]}
                style={styles.group.itemProfile}
                resizeMode="cover"
              />
              <View style={styles.group.itemMix}>
                <Text style={styles.group.itemName}>
                  {PlacesData["64e107383207e544b901bbff"].name}
                </Text>
                <Text style={styles.group.itemAddress}>
                  {PlacesData["64e107383207e544b901bbff"].address}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.group.action, styles.group.actionMan]}>
              <Text style={styles.group.actionText}>Food</Text>
              <View style={styles.group.line} />
              <SvgIcon name="RightArrowSvg" fill={colors.yellow700} />
            </TouchableOpacity>
            <View style={styles.group.item}>
              <Image
                source={food[FoodsData["64e142933207e544b901d83b"].image]}
                style={styles.group.itemProfileCircle}
                resizeMode="cover"
              />
              <View style={styles.group.itemMix}>
                <Text style={styles.group.itemName}>
                  {FoodsData["64e142933207e544b901d83b"].name}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.group.action}
            onPress={() => {
              setNewGroup(true);
              setOwnGroup(false);
            }}>
            <View style={styles.group.line} />
            <SvgIcon name="RightArrowSvg" fill={colors.yellow700} />
            <View style={styles.group.button}>
              <SvgIcon name="AddSvg" fill={colors.yellow100} />
              <Text style={styles.group.buttonText}>Create</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.group.window,
          newGroup && styles.group.windowActive,
          {
            opacity: newGroupOpacity,
            transform: [{ translateY: newGroupPostion }],
          },
        ]}>
        <View style={styles.group.infoBox}>
          <Text style={styles.group.infoBoxDistance}>200m</Text>
          <Text style={styles.group.infoBoxDesc}>
            to the BEXCO Intersection crosswalk
          </Text>
        </View>
        <View style={styles.group.groupBoxs}>
          <TouchableOpacity
            style={[styles.group.groupBox, styles.group.groupBoxWhite]}
            onPress={() => {
              setSettings(true);
              setNewGroup(false);
            }}>
            <SvgIcon name="SettingsSvg" fill={colors.yellow900} />
            <Text style={styles.group.groupBoxTextWhite}>Group Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.group.groupBox, styles.group.groupBoxWhite]}>
            <SvgIcon name="SendSvg" fill={colors.yellow900} />
            <Text style={styles.group.groupBoxTextWhite}>Group Chat</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.group.window,
          settings && styles.group.windowActive,
          {
            opacity: settingsOpacity,
            transform: [{ translateY: settingsPostion }],
          },
        ]}>
        <TouchableOpacity
          style={styles.group.close}
          onPress={() => {
            setNewGroup(true);
            setSettings(false);
          }}>
          <SvgIcon name="DownArrowSvg" fill={colors.yellow100} />
        </TouchableOpacity>
        <View style={styles.group.box}>
          <Text style={styles.group.boxTitle}>I want to eat GOOKBAP today</Text>
          <View style={styles.group.user}>
            <View style={styles.group.userProfile} />
            <View style={styles.group.userMix}>
              <Text style={styles.group.userNR}>New Request</Text>
              <Text style={styles.group.userName}>Nazuna</Text>
            </View>
          </View>
          <View style={styles.group.userCon}>
            <TouchableOpacity
              style={[styles.group.groupBox, styles.group.groupBoxWhite]}
              onPress={() => {
                setSettings(true);
                setNewGroup(false);
              }}>
              <Text style={styles.group.groupBoxTextWhite}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.group.groupBox, styles.group.groupBoxWhite]}>
              <Text style={styles.group.groupBoxTextWhite}>Decline</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.group.action}
            onPress={() => {
              setSettings(false);
            }}>
            <View style={styles.group.line} />
            <SvgIcon name="RightArrowSvg" fill={colors.yellow700} />
            <View style={styles.group.button}>
              <SvgIcon name="DeleteGroupSvg" fill={colors.yellow100} />
              <Text style={styles.group.buttonText}>Delete Group</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Group;
