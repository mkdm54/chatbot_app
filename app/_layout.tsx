import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="chatbot"
        options={{
          title: "chatbot",
          headerStyle: { backgroundColor: "#black" },
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: "chatbot",
          headerStyle: { backgroundColor: "#black" },
        }}
      />
    </Stack>
  );
}
