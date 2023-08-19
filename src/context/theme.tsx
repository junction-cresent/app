import React from "react";
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GetHexOpacity = (hex: string, opacity: number) => string;
type ViewStyles = {
  [key: string]: ViewStyle;
};
type TextStyles = {
  [key: string]: TextStyle;
};
type ImageStyles = {
  [key: string]: ImageStyle;
};
const ThemeContext = React.createContext<{
  insets: EdgeInsets;
  colors: {
    grayscale100: string;
    grayscale200: string;
    grayscale300: string;
    grayscale400: string;
    grayscale500: string;
    grayscale600: string;
    grayscale700: string;
    grayscale800: string;
    grayscale900: string;
  };
  styles: {
    [key: string]: ViewStyles | TextStyles | ImageStyles;
  };
  getHexOpacity: GetHexOpacity;
}>(null);

const { Provider } = ThemeContext;
interface ThemeProviderProps {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const insets = useSafeAreaInsets();

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
      fontFamily: "Manrope-Bold",
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
      gap: 16,
      paddingVertical: 8,
      paddingHorizontal: 20,
      backgroundColor: colors.grayscale800,
      borderRadius: 100,
    },
    focused: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 12,
      paddingLeft: 16,
      paddingRight: 20,
      backgroundColor: colors.grayscale100,
      borderRadius: 100,
    },
    focusedText: {
      fontSize: 12,
      fontFamily: "Manrope-Bold",
      color: colors.grayscale900,
    },
    unfocused: {
      padding: 8,
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
        },
        getHexOpacity,
      }}>
      {children}
    </Provider>
  );
};

export { ThemeProvider, ThemeContext };
