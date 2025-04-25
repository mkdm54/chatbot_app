import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import useCustomFonts from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

interface typeChat {
  sendPrompt?: string;
  result?: string;
}

const BubbleChat = ({ sendPrompt, result }: typeChat) => {
  const [loaded, error] = useCustomFonts();
  const [rightBubbleLayout, setRightBubbleLayout] = useState({
    width: 0,
    height: 0,
  });
  const [leftBubbleLayout, setLeftBubbleLayout] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.chat_container}>
      {sendPrompt && (
        <View style={styles.wrapper}>
          <View
            style={[
              styles.bubble,
              styles.bubble_right_shadow,
              {
                width: rightBubbleLayout.width,
                height: rightBubbleLayout.height,
              },
            ]}
          />
          <View
            style={[styles.bubble, styles.bubble_right]}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setRightBubbleLayout({ width, height });
            }}
          >
            <Text style={styles.text}>{sendPrompt}</Text>
          </View>
        </View>
      )}

      {result && (
        <View style={styles.wrapper}>
          <View
            style={[
              styles.bubble,
              styles.bubble_left_shadow,
              {
                width: leftBubbleLayout.width,
                height: leftBubbleLayout.height,
              },
            ]}
          />
          <View
            style={[styles.bubble, styles.bubble_left]}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setLeftBubbleLayout({ width, height });
            }}
          >
            <Text style={styles.text}>{result}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chat_container: {
    flex: 1,
    width: 380,
    display: "flex",
    paddingHorizontal: 10,
    marginTop: 0,
  },
  wrapper: {
    position: "relative",
    marginVertical: 10,
  },
  bubble: {
    maxWidth: 300,
    padding: 10,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#6a6054",
    position: "relative",
    zIndex: 2,
  },
  bubble_right: {
    alignSelf: "flex-end",
    backgroundColor: "#ffD850",
    borderTopRightRadius: 0,
    marginRight: 14,
  },
  bubble_left: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 0,
    marginLeft: 0,
  },
  bubble_right_shadow: {
    alignSelf: "flex-end",
    backgroundColor: "#ccc8c5",
    borderColor: "#ccc8c5",
    position: "absolute",
    top: 9,
    right: 8,
    borderRadius: 10,
    borderTopRightRadius: 0,
    zIndex: 1,
  },
  bubble_left_shadow: {
    alignSelf: "flex-start",
    backgroundColor: "#ccc8c5",
    borderColor: "#ccc8c5",
    position: "absolute",
    top: 7,
    left: -7,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    zIndex: 1,
  },
  text: {
    fontFamily: "Outfit-Medium",
    fontSize: 16,
    color: "#6a6054",
  },
});

export default BubbleChat;
