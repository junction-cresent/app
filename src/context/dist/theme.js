"use strict";
exports.__esModule = true;
exports.ThemeContext = exports.ThemeProvider = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var recoil_1 = require("recoil");
var atoms_1 = require("@app/utils/atoms");
var ThemeContext = react_1["default"].createContext(null);
exports.ThemeContext = ThemeContext;
var Provider = ThemeContext.Provider;
var ThemeProvider = function (_a) {
    var children = _a.children;
    var insets = react_native_safe_area_context_1.useSafeAreaInsets();
    var width = recoil_1.useRecoilValue(atoms_1.dimensionsAtom).width;
    var colors = {
        grayscale100: "#EBEBEB",
        grayscale200: "#E0E0E0",
        grayscale300: "#D1D1D1",
        grayscale400: "#A3A3A3",
        grayscale500: "#5C5C5C",
        grayscale600: "#3D3D3D",
        grayscale700: "#292929",
        grayscale800: "#1F1F1F",
        grayscale900: "#141414",
        orange: "#DC4D18",
        orange100: "#EEE9E7",
        orange200: "#E5DEDC",
        orange300: "#D8CECA",
        orange400: "#B29C95",
        orange500: "#6A554D",
        orange600: "#473933",
        orange700: "#2F2622",
        orange800: "#231C1A",
        orange900: "#171311",
        yellow: "#DBE458",
        yellow100: "#EDEEE7",
        yellow200: "#E5E5DC",
        yellow300: "#D7D8CA",
        yellow400: "#B0B295",
        yellow500: "#696A4D",
        yellow600: "#464733",
        yellow700: "#2E2F22",
        yellow800: "#23231A",
        yellow900: "#171711",
        purple: "#693AB7",
        purple100: "#EAE7EE",
        purple200: "#DFDCE5",
        purple300: "#CFCAD8",
        purple400: "#A095B2",
        purple500: "#584D6A",
        purple600: "#3B3347",
        purple700: "#27222F",
        purple800: "#1D1A23",
        purple900: "#131117"
    };
    var globalStyles = react_native_1.StyleSheet.create({
        container: {
            flex: 1
        }
    });
    var authStyles = react_native_1.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "flex-end",
            paddingVertical: insets.bottom + 6,
            paddingHorizontal: 12
        },
        logoContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center"
        },
        Button: {
            backgroundColor: colors.grayscale100,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            paddingVertical: 20,
            paddingHorizontal: 16,
            borderRadius: 100
        },
        ButtonText: {
            fontSize: 16,
            color: colors.grayscale900
        }
    });
    var navbarStyles = react_native_1.StyleSheet.create({
        navbar: {
            position: "absolute",
            bottom: insets.bottom + 6,
            left: 0,
            right: 0,
            alignItems: "center"
        },
        inner: {
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            paddingVertical: 8,
            paddingHorizontal: 20,
            backgroundColor: colors.grayscale800,
            borderRadius: 100
        },
        focused: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 12,
            paddingLeft: 16,
            paddingRight: 20,
            backgroundColor: colors.grayscale100,
            borderRadius: 100
        },
        focusedText: {
            fontSize: 12,
            color: colors.grayscale900
        },
        unfocused: {
            padding: 8
        }
    });
    var indexStyles = react_native_1.StyleSheet.create({
        container: {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 82,
            paddingHorizontal: 12,
            gap: 40
        },
        title: {
            fontSize: 24,
            color: colors.grayscale100,
            paddingLeft: 4,
            paddingTop: 4
        }
    });
    var pageStyles = react_native_1.StyleSheet.create({
        header: {
            marginTop: insets.top + 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 62,
            paddingHorizontal: 12,
            paddingLeft: 16
        }
    });
    var homeStyles = react_native_1.StyleSheet.create({
        container: {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 82,
            paddingHorizontal: 12,
            gap: 40
        },
        top: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 4,
            paddingRight: 0,
            marginBottom: -8
        },
        topCurrent: {
            gap: 2
        },
        topCurrentTitle: {
            fontSize: 14,
            color: colors.grayscale500
        },
        topCurrentLocation: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12
        },
        topCurrentLocationText: {
            fontSize: 24,
            color: colors.grayscale100
        },
        notification: {
            width: 54 - 4,
            height: 54 - 4,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: colors.grayscale700,
            alignItems: "center",
            justifyContent: "center"
        },
        section: {
            gap: 12
        },
        sectionTitle: {
            fontSize: 20,
            color: colors.grayscale100,
            paddingLeft: 4
        },
        dashedBox: {
            paddingVertical: 16 - 2,
            paddingHorizontal: 20 - 2,
            borderWidth: 2,
            borderColor: colors.grayscale700,
            borderStyle: "dashed",
            borderRadius: 16
        },
        archivementRow: {
            height: 86 - 4,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            gap: 2
        },
        archivementColumn: {
            alignItems: "flex-end",
            gap: 2
        },
        achievement: {
            width: (width - 64) / 15 - (2 * 14) / 15,
            height: (width - 64) / 15 - (2 * 14) / 15,
            borderRadius: 2,
            backgroundColor: colors.grayscale800
        },
        seed: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        seedText: {
            fontSize: 16,
            color: colors.grayscale100
        },
        seedCharge: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: colors.grayscale100,
            borderRadius: 100
        },
        seedChargeText: {
            fontSize: 12,
            color: colors.grayscale900
        }
    });
    var chatStyles = react_native_1.StyleSheet.create({
        menu: {
            flexDirection: "row",
            gap: 12
        },
        search: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            borderWidth: 2,
            borderColor: colors.grayscale700,
            borderStyle: "dashed",
            borderRadius: 100,
            paddingLeft: 24
        },
        searchInput: {
            flex: 1,
            paddingVertical: 20,
            paddingLeft: 16,
            paddingRight: 24,
            includeFontPadding: false,
            fontSize: 14,
            fontFamily: "Manrope-SemiBold",
            color: colors.grayscale100
        },
        add: {
            width: 64,
            height: 64,
            borderRadius: 100,
            backgroundColor: colors.grayscale100,
            alignItems: "center",
            justifyContent: "center"
        },
        list: {
            gap: 16
        },
        item: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12
        },
        profile: {
            width: 48,
            height: 48,
            borderRadius: 100,
            backgroundColor: colors.grayscale800
        },
        content: {
            flex: 1,
            gap: 4
        },
        name: {
            fontSize: 14,
            color: colors.grayscale100
        },
        preview: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6
        },
        previewText: {
            fontSize: 14,
            color: colors.grayscale500
        },
        unread: {
            fontSize: 14,
            color: colors.grayscale100
        },
        dot: {
            width: 2,
            height: 2,
            borderRadius: 100,
            backgroundColor: colors.grayscale500
        },
        count: {
            width: 28,
            height: 28,
            borderRadius: 100,
            backgroundColor: colors.grayscale100,
            alignItems: "center",
            justifyContent: "center"
        },
        countText: {
            fontSize: 14,
            color: colors.grayscale900
        }
    });
    var chattingStyles = react_native_1.StyleSheet.create({
        keyboard: {
            paddingBottom: insets.bottom
        },
        user: {
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginTop: 8,
            paddingHorizontal: 16
        },
        profile: {
            width: 36,
            height: 36,
            borderRadius: 100,
            backgroundColor: colors.grayscale800
        },
        name: {
            fontSize: 24,
            color: colors.grayscale100
        },
        chat: {
            marginBottom: 6,
            paddingHorizontal: 12,
            flexDirection: "row",
            gap: 12
        },
        search: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            borderWidth: 2,
            borderColor: colors.grayscale700,
            borderStyle: "dashed",
            borderRadius: 100
        },
        searchInput: {
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 24,
            includeFontPadding: false,
            fontSize: 14,
            fontFamily: "Manrope-SemiBold",
            color: colors.grayscale100
        },
        add: {
            width: 64,
            height: 64,
            borderRadius: 100,
            backgroundColor: colors.grayscale100,
            alignItems: "center",
            justifyContent: "center"
        }
    });
    var getHexOpacity = function (hex, opacity) {
        var hexOpacity = Math.round((opacity / 100) * 255).toString(16);
        return "" + hex + (hexOpacity.length === 1 ? "0" + hexOpacity : hexOpacity);
    };
    return (react_1["default"].createElement(Provider, { value: {
            insets: insets,
            colors: colors,
            styles: {
                global: globalStyles,
                auth: authStyles,
                navbar: navbarStyles,
                index: indexStyles,
                page: pageStyles,
                home: homeStyles,
                chat: chatStyles,
                chatting: chattingStyles
            },
            getHexOpacity: getHexOpacity
        } }, children));
};
exports.ThemeProvider = ThemeProvider;
