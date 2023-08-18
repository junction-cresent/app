import { Platform } from "react-native";
import { getUniqueId, getSystemName } from "react-native-device-info";

import { default as moment } from "moment";

const getDeviceId = async () => {
  return `${getSystemName().slice(0, 3)}-${(await getUniqueId())
    .replace(/-/g, "")
    .slice(0, 4)}`.toUpperCase();
};

type LogType = "EROR" | "REND" | "AUTH" | "AXIO";
export const log = async (type: LogType, message: string) => {
  let style: string;

  if (Platform.OS === "web") {
    switch (type) {
      case "EROR":
        style = "#f00";
        break;
      case "REND":
        style = "#0f0";
        break;
      case "AUTH":
        style = "#f0f";
        break;
      case "AXIO":
        style = "#00f";
        break;
    }
  } else {
    switch (type) {
      case "EROR":
        style = "\x1b[31m\x1b[1m";
        break;
      case "REND":
        style = "\x1b[36m\x1b[1m";
        break;
      case "AUTH":
        style = "\x1b[35m\x1b[1m";
        break;
      case "AXIO":
        style = "\x1b[34m\x1b[1m";
        break;
    }
  }

  if (Platform.OS === "web") {
    console.log(
      `%c${await getDeviceId()} [${moment().format(
        "HH:mm:ss",
      )}] %c${type}%c ${message}`,
      "color: #888",
      `color: ${style}`,
      "color: #888",
    );
  } else {
    console.log(
      `\x1b[2m${await getDeviceId()} [${moment().format(
        "HH:mm:ss",
      )}] \x1b[0m${style}${type}\x1b[0m ${message}`,
    );
  }
};
