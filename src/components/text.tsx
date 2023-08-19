import React from "react";
import { StyleSheet, TextStyle, Text } from "react-native";

interface CustomTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
}
const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    fontFamily: "Manrope-SemiBold",
  },
});

export default CustomText;
