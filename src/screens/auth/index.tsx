import React from "react";
import { View, TouchableOpacity } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useSetRecoilState } from "recoil";

import { Text, SvgIcon } from "@app/components";
import { SplashContext } from "@app/context/splash";
import { ThemeContext } from "@app/context/theme";
import { authAtom } from "@app/utils/atoms";
import { log } from "@app/utils/logging";

const Auth = () => {
  const { styles } = React.useContext(ThemeContext);

  const { loaded } = React.useContext(SplashContext);
  const setAuth = useSetRecoilState(authAtom);

  const [loading, setLoading] = React.useState(false);
  const login = async () => {
    setLoading(true);

    try {
      const { idToken } = await GoogleSignin.signIn();
      // const { data } = await publicAxios.post("/auth/login", {
      //   token: idToken,
      // });
      if (!idToken) throw new Error("No token");
      setAuth({
        accessToken: "",
        refreshToken: "",
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
  return (
    <View style={styles.global.container}>
      <View style={styles.auth.logoContainer}>
        <SvgIcon name="Logo160" />
      </View>
      <View style={styles.auth.container}>
        <TouchableOpacity style={styles.auth.Button} onPress={login}>
          <SvgIcon name="GoogleLogin" />
          <Text style={styles.auth.ButtonText}>Login with Google Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Auth;
