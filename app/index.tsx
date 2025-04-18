import { Text, View, StyleSheet, Image } from "react-native";
import { Stack, Link } from 'expo-router';
import { useEffect } from "react";
import useCustomFonts from "@/src/hooks/useCustomFonts";
import * as SplashScreen from 'expo-splash-screen';
import Button from "@/components/Button";

SplashScreen.preventAutoHideAsync()

export default function Index() {
  const [loaded, error] = useCustomFonts()

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
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <View style={styles.img_container}>
        <Image
          // image by https://www.vecteezy.com/vector-art/23093053-artificial-intelligence-robot-chatbot-vector-ai-chatbot-concept-colored-icon
          source={require('@/assets/images/icon.png')}
          style={styles.img_style}
        />
      </View>
      <Text style={styles.chatbot_title}>nova</Text>
      <Text style={styles.chatbot_description}>
        Selamat datang! NOVA siap membantu. Click Get Started untuk memulai.
      </Text>
      <Link href={{ pathname: "/chatbot" }} push asChild>
        <Button
          title="Get Started"
          style={{ top: 20, alignSelf: 'center' }}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img_container: {
    width: 250,
    height: 250,
    backgroundColor: "#ffD850",
    borderRadius: 200,
    borderWidth: 5,
    borderColor: '#6a6054',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img_style: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderColor: '#6a6054',
  },
  chatbot_title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 40,
    textTransform: "uppercase",
    color: '#6a6054',
  },
  chatbot_description: {
    fontSize: 16,
    textAlign: 'center', // Menengahkan teks
    paddingHorizontal: 35,
    flexWrap: 'wrap',
    fontFamily: 'Outfit-Medium',
  }
});
