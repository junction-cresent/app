import React from "react";
import { View, Text } from "react-native";

import { SplashContext } from "@app/context/splash";

const Home = () => {
  const { loaded } = React.useContext(SplashContext);

  React.useEffect(() => {
    loaded();
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Home;
