import { Stack } from "expo-router/stack";
import { Colors } from "@/constant/Color";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="chatbot"
        options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: Colors.light.yellow_background },
          headerLeft: () => false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}