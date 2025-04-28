import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Pressable,
  LayoutChangeEvent,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constant/Color";

export default function NotFoundScreen() {
  const router = useRouter();
  const [buttonLayout, setButtonLayout] = useState({ width: 0, height: 0 });
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

  const onButtonLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setButtonLayout({ width, height });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/404.png")}
        style={[styles.image, { tintColor: Colors.light.red_v1 }]}
      />
      <Text style={styles.code_404}>404</Text>
      <Text style={styles.title}>Oops! Halaman tidak ditemukan</Text>
      <Text style={styles.description}>
        Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </Text>

      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => router.push("/auth/LoginScreen")}
      >
        <Animated.View
          style={[styles.buttonWrapper, { transform: [{ scale }] }]}
          onLayout={onButtonLayout}
        >
          <View
            style={[
              styles.shadowButton,
              {
                width: buttonLayout.width,
                height: buttonLayout.height,
              },
            ]}
          >
            <Text style={styles.hiddenText}>Kembali ke Beranda</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Kembali ke Beranda</Text>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Outfit-Bold",
  },
  description: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Outfit-Medium",
  },
  buttonWrapper: {
    position: "relative",
  },
  button: {
    backgroundColor: Colors.light.red_v1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: Colors.light.border_color,
    zIndex: 1,
  },
  shadowButton: {
    position: "absolute",
    bottom: -8,
    right: -8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: Colors.light.shadow_color,
    borderWidth: 4,
    borderColor: Colors.light.shadow_color,
    zIndex: -1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Outfit-Medium",
  },
  hiddenText: {
    opacity: 0,
    fontSize: 20,
    fontFamily: "Outfit-Medium",
  },
  code_404: {
    fontSize: 40,
    color: Colors.light.red_v1,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Outfit-Bold",
  },
});