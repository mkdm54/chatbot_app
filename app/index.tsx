import { Text, View, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import useCustomFonts from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";
import { Button } from "@/components/Button";
import { Colors } from "@/constant/Color";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const [loaded, error] = useCustomFonts();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image
        // image by https://freesvg.org/1538298822
        source={require("@/assets/images/icon.png")}
        style={styles.img_style}
      />
      <Text style={styles.chatbot_title}>nova</Text>
      <Text style={styles.chatbot_description}>
        Selamat datang! NOVA siap membantu. Click Mulai untuk memulai.
      </Text>
      <Button
        title="Mulai"
        style={{ top: 20, alignSelf: "center" }}
        onPress={() => router.push("/auth/LoginScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img_style: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    borderColor: Colors.light.border_color,
  },
  chatbot_title: {
    fontFamily: "Outfit-Bold",
    fontSize: 40,
    textTransform: "uppercase",
    color: Colors.light.border_color,
  },
  chatbot_description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 35,
    flexWrap: "wrap",
    fontFamily: "Outfit-Medium",
    color: Colors.light.text,
  },
});
