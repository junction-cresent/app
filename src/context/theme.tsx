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
  viewStyles: ViewStyles;
  textStyles: TextStyles;
  imageStyles: ImageStyles;
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
  };

  const viewStyles = StyleSheet.create<ViewStyles>({
    container: {
      flex: 1,
    },
    authContainer: {
      flex: 1,
      justifyContent: "flex-end",
      paddingVertical: insets.bottom + 6,
      paddingHorizontal: 12,
    },
    authLogoContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    authButton: {
      backgroundColor: colors.grayscale100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderRadius: 100,
    },
  });

  const textStyles = StyleSheet.create<TextStyles>({
    authButton: {
      fontSize: 16,
      fontFamily: "Manrope-Bold",
      color: colors.grayscale900,
    },
  });

  const imageStyles = StyleSheet.create<ImageStyles>({});

  const getHexOpacity: GetHexOpacity = (hex, opacity) => {
    const hexOpacity = Math.round((opacity / 100) * 255).toString(16);
    return `${hex}${hexOpacity.length === 1 ? `0${hexOpacity}` : hexOpacity}`;
  };

  return (
    <Provider
      value={{
        insets,
        colors,
        viewStyles,
        textStyles,
        imageStyles,
        getHexOpacity,
      }}>
      {children}
    </Provider>
  );
};

export { ThemeProvider, ThemeContext };
