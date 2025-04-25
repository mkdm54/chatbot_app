import React, { useEffect, forwardRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  Pressable,
  TextStyle,
  LayoutChangeEvent,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import useCustomFonts from "@/hooks/useCustomFonts";

SplashScreen.preventAutoHideAsync();

interface TitleButton {
  title?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

export const Button = forwardRef<React.ElementRef<typeof Animated.View>, TitleButton>(
  ({ title, style, textStyle, onPress }, ref) => {
    const [loaded, error] = useCustomFonts();
    const [buttonLayout, setButtonLayout] = useState({ width: 0, height: 0 });

    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);

    if (!loaded && !error) {
      return null;
    }

    const [scale] = useState(new Animated.Value(1));

    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.9,
        friction: 4,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    };

    const onButtonLayout = (event : LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setButtonLayout({ width, height });
    };

    return (
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Animated.View
          ref={ref}
          style={[styles.wrapper, { transform: [{ scale }] }]}
          onLayout={onButtonLayout}
        >
          {/* Shadow Button at bottom-right */}
          <View
            style={[
              styles.shadow_button,
              {
                width: buttonLayout.width,
                height: buttonLayout.height,
              },
            ]}
          >
            <Text style={[styles.hidden_text, textStyle]}>{title}</Text>
          </View>

          {/* Actual Button */}
          <View style={[styles.button_style, style]}>
            <Text style={[styles.text_style, textStyle]}>{title}</Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  shadow_button: {
    position: "absolute",
    bottom: -30,
    right: -7,
    padding: 14,
    borderRadius: 15,
    backgroundColor: "#ccc8c5",
    borderWidth: 4,
    borderColor: "#ccc8c5",
    zIndex: -1,
  },
  hidden_text: {
    opacity: 0,
    fontSize: 30,
    fontFamily: "Outfit-Medium",
  },
  button_style: {
    padding: 14,
    borderRadius: 15,
    backgroundColor: "#ffD850",
    borderWidth: 4,
    borderColor: "#6a6054",
    zIndex: 1,
  },
  text_style: {
    color: "#6a6054",
    fontFamily: "Outfit-Medium",
    fontSize: 30,
  },
});
