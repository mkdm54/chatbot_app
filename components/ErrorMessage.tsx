import { useEffect } from "react";
import { View, Text } from "react-native";
import useCustomFonts from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

interface MessageProops {
  message?: string;
}

const ErrorMessage = ({ message }: MessageProops) => {
  const [loaded, error] = useCustomFonts();

  if (!message) return null;
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View
      style={{
        backgroundColor: "#ffcccc",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#cc0000", fontWeight: "bold", fontFamily: "Outfit-Medium" }}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;
