import { useEffect } from "react";
import { Stack } from "expo-router/stack";
import { Colors } from "@/constant/Color";
import useCustomFonts from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";
import CustomHeader from "@/components/CustomHeader";
import { UserProvider } from "@/context/UserContext";
import { useUser } from "@/context/UserContext";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
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
    <UserProvider>
      <MainLayout />
    </UserProvider>
  );
}

// Ini komponen baru yang isinya useUser()
function MainLayout() {
  const { user, profileImage } = useUser();
  
  useEffect(() => {
    console.log("Current user:", user);
    console.log("Current profile image:", profileImage);
  }, [user, profileImage]);

  return (
    <Stack>
      <Stack.Screen
        name="chatbot"
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              title="NOVA AI"
              img={require("@/assets/images/icon.png")}
              username={user}
              profileImage={profileImage}
            />
          ),
        }}
      />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="not-found" options={{ headerShown: false }} />
    </Stack>
  );
}
