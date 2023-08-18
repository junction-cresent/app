import React from "react";
import { AppRegistry, StatusBar, Platform, LogBox } from "react-native";
import "react-native-gesture-handler";
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableFreeze, enableScreens } from "react-native-screens";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import moment from "moment-timezone";
import { RecoilRoot } from "recoil";

import { AxiosProvider } from "@app/context/axios";
import { SplashProvider } from "@app/context/splash";
import { ThemeProvider } from "@app/context/theme";
import App from "@app/index";
import { log } from "@app/utils/logging";

import getEnvVars from "@root/environment";

import { name as appName } from "./app.json";

const { googleWebClientId } = getEnvVars();

moment.tz.setDefault("Asia/Seoul");
enableFreeze(true);
enableScreens(true);
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
]);

const Root = () => {
  log("REND", "INIT");

  StatusBar.setBarStyle("light-content");
  Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
  Platform.OS === "android" && StatusBar.setTranslucent(true);

  GoogleSignin.configure({
    webClientId: googleWebClientId,
    offlineAccess: true,
  });

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <ThemeProvider>
          <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
            <AxiosProvider>
              <SplashProvider>
                <App />
              </SplashProvider>
            </AxiosProvider>
          </ReactNativeRecoilPersistGate>
        </ThemeProvider>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

AppRegistry.registerComponent(appName, () => Root);
