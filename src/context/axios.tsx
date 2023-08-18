import type { AxiosInstance } from "axios";

import React from "react";

import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";

import { authAtom } from "@app/utils/atoms";
import { log } from "@app/utils/logging";
import { getItemAsync } from "@app/utils/store";

import getEnvVars from "@root/environment";

const { apiUrl } = getEnvVars();

type Logout = () => Promise<void>;
type Refresh = () => Promise<void>;
const AxiosContext = React.createContext<{
  publicAxios: AxiosInstance;
  authAxios: AxiosInstance;
  refresh: Refresh;
  logout: Logout;
}>(null);

const { Provider } = AxiosContext;
interface AxiosProviderProps {
  children: React.ReactNode;
}
const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  const [auth, setAuth] = useRecoilState(authAtom);

  type GetAuthKey = "accessToken" | "refreshToken" | "authenticated";
  const getAuth = async (key: GetAuthKey) => {
    return JSON.parse(
      await getItemAsync("asyncRecoilPersistStorageReactNative"),
    ).authAtom[key];
  };

  // const setUser = useSetRecoilState(userAtom);
  React.useEffect(() => {
    log("AUTH", "Token Updated");
    if (auth.authenticated) {
      const user = jwt_decode(auth.accessToken);
      log("AUTH", `User Info Updated: ${user}`);
      // setUser(user);
    }
  }, [auth]);

  const publicAxios = axios.create({
    baseURL: apiUrl,
  });

  const authAxios = axios.create({
    baseURL: apiUrl,
  });

  authAxios.interceptors.request.use(
    async (config) => {
      log("AXIO", `Interceptor Request: ${config.url}`);
      console.log(await getAuth("accessToken"));
      config.headers.Authorization = `Bearer ${await getAuth("accessToken")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  authAxios.interceptors.response.use(
    async (response) => {
      log("AXIO", `Interceptor Response: ${response.status}`);
      return response;
    },
    async (error) => {
      log(
        "EROR",
        `Axios Interceptor: ${error.response.status} ${error.response.data.message}`,
      );
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refresh();
        return authAxios(originalRequest);
      } else if (error.response.status === 401 && originalRequest._retry) {
        log("AUTH", "Logout");
        return logout();
      }
      return Promise.reject(error);
    },
  );

  const refresh: Refresh = async () => {
    const [accessToken, refreshToken] = await refreshAccessToken();
    setAuth({
      ...auth,
      accessToken,
      refreshToken,
    });
  };

  const refreshAccessToken = async () =>
    axios({
      method: "POST",
      data: {
        token: await getAuth("refreshToken"),
      },
      url: apiUrl + "/auth/refresh",
    })
      .then((tokenRefreshResponse) => [
        tokenRefreshResponse.data.accessToken,
        tokenRefreshResponse.data.refreshToken,
      ])
      .catch(async () => {
        log("AUTH", "Refresh Token Error");
        await logout();
        return Promise.reject();
      });

  const resetAuth = useResetRecoilState(authAtom);
  const logout: Logout = async () => {
    try {
      await publicAxios.post("/auth/logout", {
        token: await getAuth("refreshToken"),
      });
    } catch (err) {
      log("AUTH", "Logout Error");
    } finally {
      resetAuth();
    }
  };

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
        refresh,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
