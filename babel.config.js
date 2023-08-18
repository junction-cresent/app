module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          "@root": "./",
          "@app": "./src",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
