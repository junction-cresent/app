import ReactNativeRecoilPersist from "react-native-recoil-persist";

import { atom } from "recoil";

export const authAtom = atom({
  key: "authAtom",
  default: {
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
