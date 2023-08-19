import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRecoilValue } from "recoil";

import { dimensionsAtom } from "@app/utils/atoms";

type GetHexOpacity = (hex: string, opacity: number) => string;
const ThemeContext = React.createContext<{
  insets: EdgeInsets;
  colors: {
    [key: string]: string;
  };
  styles: {
    [key: string]: {
      [key: string]: ViewStyle & TextStyle & StyleProp<ImageStyle>;
    };
  };
  getHexOpacity: GetHexOpacity;
}>(null);

const { Provider } = ThemeContext;
interface ThemeProviderProps {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const { width } = useRecoilValue(dimensionsAtom);

  const colors = {
    grayscale100: "#EBEBEB",
    grayscale200: "#E0E0E0",
    grayscale300: "#D1D1D1",
    grayscale400: "#A3A3A3",
    grayscale500: "#5C5C5C",
    grayscale600: "#3D3D3D",
    grayscale700: "#292929",
    grayscale800: "#1F1F1F",
    grayscale900: "#141414",

    orange: "#DC4D18",
    orange100: "#EEE9E7",
    orange200: "#E5DEDC",
    orange300: "#D8CECA",
    orange400: "#B29C95",
    orange500: "#6A554D",
    orange600: "#473933",
    orange700: "#2F2622",
    orange800: "#231C1A",
    orange900: "#171311",

    yellow: "#DBE458",
    yellow100: "#EDEEE7",
    yellow200: "#E5E5DC",
    yellow300: "#D7D8CA",
    yellow400: "#B0B295",
    yellow500: "#696A4D",
    yellow600: "#464733",
    yellow700: "#2E2F22",
    yellow800: "#23231A",
    yellow900: "#171711",

    purple: "#693AB7",
    purple100: "#EAE7EE",
    purple200: "#DFDCE5",
    purple300: "#CFCAD8",
    purple400: "#A095B2",
    purple500: "#584D6A",
    purple600: "#3B3347",
    purple700: "#27222F",
    purple800: "#1D1A23",
    purple900: "#131117",
  };

  const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  const authStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      paddingVertical: insets.bottom + 6,
      paddingHorizontal: 12,
    },
    logoContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    Button: {
      backgroundColor: colors.grayscale100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderRadius: 100,
    },
    ButtonText: {
      fontSize: 16,
      color: colors.grayscale900,
    },
  });

  const navbarStyles = StyleSheet.create({
    navbar: {
      position: "absolute",
      bottom: insets.bottom + 6,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    inner: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 8,
      backgroundColor: colors.grayscale800,
      borderRadius: 100,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 100,
    },
    focused: {
      backgroundColor: colors.grayscale100,
      paddingLeft: 16,
      paddingRight: 20,
    },
    focusedText: {
      width: 38,
      fontSize: 12,
      textAlign: "center",
      color: colors.grayscale900,
    },
    unfocused: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  const indexStyles = StyleSheet.create({
    container: {
      paddingTop: insets.top + 12,
      paddingBottom: insets.bottom + 64 + 6 + 12,
      paddingHorizontal: 12,
      gap: 40,
    },
    title: {
      fontSize: 24,
      color: colors.grayscale100,
      paddingLeft: 4,
      paddingTop: 4,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 4,
      paddingRight: 0,
      height: 54,
      gap: 12,
    },
    headerContent: {
      flex: 1,
      gap: 2,
    },
    headerCurrent: {
      fontSize: 14,
      color: colors.grayscale500,
    },
    headerTitle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    headerTitleText: {
      fontSize: 24,
      color: colors.grayscale100,
    },
    button: {
      width: 54,
      height: 54,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: colors.grayscale700,
      alignItems: "center",
      justifyContent: "center",
    },
    search: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      borderWidth: 2,
      borderColor: colors.grayscale700,
      borderStyle: "dashed",
      borderRadius: 100,
      paddingLeft: 24 - 2,
      marginTop: -24,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 20 - 2,
      paddingLeft: 16,
      paddingRight: 24 - 2,
      includeFontPadding: false,
      fontSize: 14,
      fontFamily: "Manrope-SemiBold",
      color: colors.grayscale100,
    },
  });

  const pageStyles = StyleSheet.create({
    header: {
      marginTop: insets.top + 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 62,
      paddingLeft: 4,
    },
    headerButton: {
      width: 54,
      height: 54,
      borderRadius: 100,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    headerButtons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    headerFloating: {
      position: "absolute",
      zIndex: 10,
      top: insets.top + 10,
      left: 6,
      right: 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 66,
      padding: 6,
      paddingLeft: 10,
      borderRadius: 100,
    },
  });

  const homeStyles = StyleSheet.create({
    section: {
      gap: 12,
    },
    sectionTitle: {
      fontSize: 20,
      color: colors.grayscale600,
      paddingLeft: 4,
    },
    dashedBox: {
      paddingVertical: 16 - 2,
      paddingHorizontal: 20 - 2,
      borderWidth: 2,
      borderColor: colors.grayscale700,
      borderStyle: "dashed",
      borderRadius: 16,
    },
    archivementRow: {
      height: 86 - 4,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      gap: 2,
    },
    archivementColumn: {
      alignItems: "flex-end",
      gap: 2,
    },
    achievement: {
      width: (width - 64) / 15 - (2 * 14) / 15,
      height: (width - 64) / 15 - (2 * 14) / 15,
      borderRadius: 2,
      backgroundColor: colors.grayscale800,
    },
    seed: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    seedText: {
      fontSize: 16,
      color: colors.grayscale100,
    },
    seedCharge: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.grayscale100,
      borderRadius: 100,
    },
    seedChargeText: {
      fontSize: 12,
      color: colors.grayscale900,
    },
    grid: {
      gap: 12,
    },
    gridRow: {
      flexDirection: "row",
      gap: 12,
    },
    gridItem: {
      height: 108,
      flex: 1,
      backgroundColor: colors.grayscale800,
      paddingHorizontal: 16,
      justifyContent: "center",
      borderRadius: 16,
      gap: 4,
    },
    gridOrangeTitle: {
      fontSize: 28,
      color: colors.orange100,
    },
    gridOrangeDescription: {
      fontSize: 14,
      color: colors.orange100,
    },
    gridYellowTitle: {
      fontSize: 28,
      color: colors.yellow600,
    },
    gridYellowDescription: {
      fontSize: 14,
      color: colors.yellow600,
    },
    gridPurpleTitle: {
      fontSize: 28,
      color: colors.purple100,
    },
    gridPurpleDescription: {
      fontSize: 14,
      color: colors.purple100,
    },
    gridItemOrange: {
      backgroundColor: colors.orange,
    },
    gridItemYellow: {
      backgroundColor: colors.yellow,
    },
    gridItemPurple: {
      backgroundColor: colors.purple,
    },
  });

  const matchingStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.orange900,
      paddingHorizontal: 12,
    },
    headerButton: {
      borderColor: colors.orange700,
    },
    menus: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
    },
    menu: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 12 - 2,
      paddingLeft: 16 - 2,
      paddingRight: 20 - 2,
      borderWidth: 2,
      borderColor: colors.orange700,
      borderRadius: 100,
    },
    menuText: {
      fontSize: 14,
      color: colors.orange100,
    },
    list: {
      paddingHorizontal: 12,
      marginTop: 16,
    },
    card: {
      padding: 16 - 2,
      gap: 40,
      borderWidth: 2,
      borderColor: colors.orange700,
      borderRadius: 16,
    },
    info: {
      gap: 16,
    },
    user: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    profile: {
      width: 36,
      height: 36,
      borderRadius: 100,
      backgroundColor: colors.orange800,
    },
    name: {
      fontSize: 24,
      color: colors.orange100,
    },
    line: {
      flex: 1,
      height: 2,
      borderRadius: 1,
      backgroundColor: colors.orange600,
    },
    introducing: {
      fontSize: 16,
      color: colors.orange100,
    },
    tags: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    tag: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: colors.orange700,
      borderRadius: 100,
    },
    tagText: {
      fontSize: 12,
      color: colors.orange100,
    },
    section: {
      gap: 12,
    },
    sectionTitle: {
      fontSize: 16,
      color: colors.orange600,
    },
    place: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    placeProfile: {
      width: 48,
      height: 48,
      borderRadius: 8,
      backgroundColor: colors.orange800,
    },
    placeInfo: {
      gap: 2,
    },
    placeName: {
      fontSize: 16,
      color: colors.orange100,
    },
    placeAddress: {
      fontSize: 12,
      color: colors.orange400,
    },
    food: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    foodProfile: {
      width: 36,
      height: 36,
      borderRadius: 100,
      backgroundColor: colors.orange800,
    },
    foodName: {
      fontSize: 16,
      color: colors.orange100,
    },
    snap: {
      flex: 1,
    },
    snapItem: {
      paddingTop: 16,
    },
    snapInfo: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    snapText: {
      fontSize: 14,
      color: colors.orange500,
    },
    button: {
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 16,
      backgroundColor: colors.orange100,
      borderRadius: 100,
      marginBottom: insets.bottom + 6,
    },
    buttonText: {
      fontSize: 14,
      color: colors.orange900,
    },
  });

  const challengesStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.purple900,
      paddingHorizontal: 12,
    },
    headerButton: {
      borderColor: colors.purple700,
    },
    scroll: {
      marginHorizontal: -12,
      paddingHorizontal: 12,
      paddingTop: 16,
      gap: 40,
    },
    content: {
      paddingTop: 40,
      paddingBottom: insets.bottom + 12,
      gap: 12,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 20 - 2,
      paddingHorizontal: 24 - 2,
      borderWidth: 2,
      gap: 16,
      borderColor: colors.purple700,
      borderRadius: 100,
    },
    buttonText: {
      fontSize: 14,
      color: colors.purple100,
    },
    title: {
      fontSize: 20,
      color: colors.purple600,
    },
    list: {
      gap: 16,
    },
    item: {
      padding: 16 - 2,
      gap: 16,
      borderWidth: 2,
      borderColor: colors.purple700,
      borderStyle: "dashed",
      borderRadius: 16,
    },
    thumbnail: {
      width: "100%",
      height: 120,
      borderRadius: 16,
      backgroundColor: colors.purple800,
    },
    info: {
      gap: 4,
    },
    name: {
      fontSize: 16,
      color: colors.purple100,
    },
    by: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    byText: {
      fontSize: 14,
      color: colors.purple500,
    },
    byUser: {
      fontSize: 14,
      color: colors.purple300,
    },
    statistics: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    statistic: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    statisticText: {
      fontSize: 14,
      color: colors.purple300,
    },
  });

  const detailStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.purple900,
    },
    headerFloating: {
      backgroundColor: colors.purple900,
    },
    top: {
      padding: 16,
      paddingTop: 14 + 66 + 10 + insets.top,
    },
    title: {
      fontSize: 36,
      color: colors.purple100,
    },
    background: {
      position: "absolute",
      zIndex: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.purple800,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    gradient: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    content: {
      padding: 16,
      gap: 40,
    },
    statistics: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    statistic: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    statisticByText: {
      fontSize: 14,
      color: colors.purple500,
    },
    statisticText: {
      fontSize: 14,
      color: colors.purple300,
    },
    section: {
      gap: 12,
    },
    sectionTitle: {
      fontSize: 16,
      color: colors.purple100,
    },
    sectionDescription: {
      fontSize: 14,
      color: colors.purple400,
    },
    button: {
      backgroundColor: colors.purple100,
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderRadius: 100,
      marginHorizontal: 12,
      marginBottom: insets.bottom + 6,
    },
    buttonText: {
      fontSize: 14,
      color: colors.purple900,
    },
  });

  const nearStyles = StyleSheet.create({
    list: {
      gap: 12,
    },
    item: {
      padding: 16 - 2,
      gap: 16,
      borderWidth: 2,
      borderColor: colors.grayscale700,
      borderRadius: 16,
    },
    info: {
      gap: 4,
    },
    name: {
      fontSize: 20,
      color: colors.grayscale100,
    },
    address: {
      fontSize: 12,
      color: colors.grayscale400,
    },
    tags: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    tag: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: colors.grayscale700,
      borderRadius: 100,
    },
    tagText: {
      fontSize: 12,
      color: colors.grayscale100,
    },
    images: {
      flexDirection: "row",
      height: 120,
      gap: 12,
    },
    image: {
      flex: 1,
      height: 120,
      borderRadius: 8,
      backgroundColor: colors.grayscale800,
    },
    statistics: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    statistic: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    statisticText: {
      fontSize: 14,
      color: colors.grayscale300,
    },
  });

  const chatStyles = StyleSheet.create({
    menu: {
      flexDirection: "row",
      gap: 12,
    },
    list: {
      gap: 16,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    profile: {
      width: 48,
      height: 48,
      borderRadius: 100,
    },
    content: {
      flex: 1,
      gap: 4,
    },
    name: {
      fontSize: 14,
      color: colors.grayscale100,
    },
    preview: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      maxWidth: width - 200,
    },
    previewText: {
      fontSize: 14,
      color: colors.grayscale500,
    },
    unreadChat: {
      fontSize: 14,
      color: colors.grayscale100,
    },
    dot: {
      width: 2,
      height: 2,
      borderRadius: 100,
      backgroundColor: colors.grayscale500,
    },
    unread: {
      width: 28,
      height: 28,
      borderRadius: 100,
      backgroundColor: colors.grayscale100,
      alignItems: "center",
      justifyContent: "center",
    },
    unreadText: {
      fontSize: 14,
      color: colors.grayscale900,
    },
  });

  const chattingStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: insets.bottom,
      paddingHorizontal: 12,
    },
    keyboard: {
      flex: 1,
      marginBottom: -6,
    },
    user: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      marginTop: 8,
      marginBottom: 16,
      paddingHorizontal: 4,
    },
    profile: {
      width: 36,
      height: 36,
      borderRadius: 100,
      backgroundColor: colors.grayscale800,
    },
    name: {
      fontSize: 24,
      color: colors.grayscale100,
    },
    scroll: {
      marginHorizontal: -12,
      paddingHorizontal: 12,
    },
    bubbles: {
      paddingVertical: 16,
      gap: 12,
    },
    bubble: {
      alignSelf: "flex-start",
      maxWidth: width - 64,
      paddingVertical: 20 - 2,
      paddingHorizontal: 24 - 2,
      borderWidth: 2,
      borderColor: colors.grayscale700,
      borderRadius: 100,
    },
    bubbleText: {
      fontSize: 14,
      color: colors.grayscale100,
    },
    bubbleMe: {
      alignSelf: "flex-end",
      maxWidth: width - 64,
      paddingVertical: 20,
      paddingHorizontal: 24,
      backgroundColor: colors.grayscale700,
      borderRadius: 100,
    },
    bubbleMeText: {
      fontSize: 14,
      color: colors.grayscale100,
    },
    chat: {
      marginBottom: 12,
      flexDirection: "row",
      gap: 12,
    },
    search: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      borderWidth: 2,
      borderColor: colors.grayscale700,
      borderStyle: "dashed",
      borderRadius: 100,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 20 - 2,
      paddingHorizontal: 24 - 2,
      includeFontPadding: false,
      fontSize: 14,
      fontFamily: "Manrope-SemiBold",
      color: colors.grayscale100,
    },
    button: {
      width: 64,
      height: 64,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    add: {
      backgroundColor: colors.grayscale100,
    },
    send: {
      backgroundColor: colors.grayscale800,
    },
  });

  const getHexOpacity: GetHexOpacity = (hex, opacity) => {
    const hexOpacity = Math.round((opacity / 100) * 255).toString(16);
    return `${hex}${hexOpacity.length === 1 ? `0${hexOpacity}` : hexOpacity}`;
  };

  return (
    <Provider
      value={{
        insets,
        colors,
        styles: {
          global: globalStyles,
          auth: authStyles,
          navbar: navbarStyles,
          index: indexStyles,
          page: pageStyles,
          home: homeStyles,
          matching: matchingStyles,
          challenges: challengesStyles,
          detail: detailStyles,
          near: nearStyles,
          chat: chatStyles,
          chatting: chattingStyles,
        },
        getHexOpacity,
      }}>
      {children}
    </Provider>
  );
};

export { ThemeProvider, ThemeContext };
