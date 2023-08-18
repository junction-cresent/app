import React from "react";
import { View, TouchableOpacity } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useSetRecoilState } from "recoil";

import { Text, SvgIcon } from "@app/components";
import { AxiosContext } from "@app/context/axios";
import { SplashContext } from "@app/context/splash";
import { ThemeContext } from "@app/context/theme";
import { authAtom } from "@app/utils/atoms";
import { log } from "@app/utils/logging";

const Auth = () => {
  const { viewStyles } = React.useContext(ThemeContext);

  const { loaded } = React.useContext(SplashContext);
  const { publicAxios } = React.useContext(AxiosContext);
  const setAuth = useSetRecoilState(authAtom);

  const [loading, setLoading] = React.useState(false);
  const login = async () => {
    setLoading(true);

    try {
      const { idToken } = await GoogleSignin.signIn();
      const { data } = await publicAxios.post("/auth/login", {
        token: idToken,
      });
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        authenticated: true,
      });
    } catch (e) {
      log("EROR", `Login ${e.name}`);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    loaded();
  }, []);

  log("REND", "Root Stack > Auth Stack");
  return <View style={viewStyles.container} />;
};

export default Auth;
