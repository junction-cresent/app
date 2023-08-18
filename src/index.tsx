import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { log } from "@app/utils/logging";

import { ThemeContext } from "./context/theme";
import Root from "./screens";

const App = () => {
  const { colors } = React.useContext(ThemeContext);

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
