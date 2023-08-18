import React from "react";
import { StyleSheet, TextStyle, Text } from "react-native";

interface CustomTextProps {
  children: React.ReactNode;
  style?: TextStyle;
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
  },
});

export default CustomText;
