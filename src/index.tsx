import React from "react";
import { Dimensions } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";

import { dimensionsAtom } from "@app/utils/atoms";
import { log } from "@app/utils/logging";

import { ThemeContext } from "./context/theme";
import Root from "./screens";

const { width, height } = Dimensions.get("window");
const App = () => {
  const { colors } = React.useContext(ThemeContext);
  const setDimensions = useSetRecoilState(dimensionsAtom);

  const onChange = ({ window }) => {
    setDimensions({
      width: window.width,
      height: window.height,
    });
  };

  React.useEffect(() => {
    setDimensions({ width: width, height: height });
    Dimensions.addEventListener("change", onChange);
  }, []);

  const onLayout = () => {
    log("REND", "onLayout");
  };

  log("REND", "app");
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: colors.grayscale100,
          background: colors.grayscale900,
          card: colors.grayscale900,
          border: colors.grayscale900,
          text: colors.grayscale100,
          notification: colors.grayscale100,
        },
      }}
      onReady={onLayout}>
      <Root />
    </NavigationContainer>
  );
};

export default App;
