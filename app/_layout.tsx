import { Stack } from "expo-router/stack";
import { Colors } from "@/constant/Color";
import { View, Text } from "react-native";
import useCustomFonts from "@/hooks/useCustomFonts";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="chatbot"
        options={{
          title: "",
          headerShown: true,
          header: () => (
            <View
              style={{
                backgroundColor: Colors.light.yellow_background,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 4,
                borderBottomColor: "#6a6054",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.light.text,
                  textAlign: "center",
                  fontFamily: 'Outfit-Medium',
                }}
              >
                Chatbot
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth/LoginScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="not-found"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
