import React from "react";
import { Platform } from "react-native";
import RNBootSplash from "react-native-bootsplash";

import { log } from "@app/utils/logging";

const SplashContext = React.createContext<{
  loaded: () => void;
}>(null);

const { Provider } = SplashContext;
interface SplashProviderProps {
  children: React.ReactNode;
}
const SplashProvider: React.FC<SplashProviderProps> = ({ children }) => {
  const [splash, setSplash] = React.useState(true);
  const loaded = () => {
    if (Platform.OS === "web") {
      return;
    }
    if (!splash) {
      return;
    }
    RNBootSplash.hide({ fade: true, duration: 200 });
    log("REND", "SplashScreen");
    setSplash(false);
  };

  return (
    <Provider
      value={{
        loaded,
      }}>
      {children}
    </Provider>
  );
};

export { SplashContext, SplashProvider };
