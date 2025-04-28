import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import useCustomFonts from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

interface MessageProps {
  message?: string;
  type?: "error" | "success";
  isLoading?: boolean;
}

const CustomMessage = ({
  message,
  type = "error",
  isLoading = false,
}: MessageProps) => {
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

  // Menentukan warna berdasarkan tipe pesan
  const backgroundColor = type === "success" ? "#9FF79FFF" : "#ffcccc";
  const textColor = type === "success" ? "#28a745" : "#cc0000";

  return (
    <View
      style={{
        backgroundColor,
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={textColor}
          style={{ marginRight: 8 }}
        />
      )}
      <Text
        style={{
          color: textColor,
          fontWeight: "bold",
          fontFamily: "Outfit-Medium",
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default CustomMessage;
