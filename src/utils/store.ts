import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItemAsync = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const getItemAsync = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const deleteItemAsync = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
