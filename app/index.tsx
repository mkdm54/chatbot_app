import { Text, View, StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()
import Button from "@/components/Button";

export default function Index() {
  const [loaded, error] = useFonts({
    'Outfit-Black': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Black.ttf'),
    'Outfit-Bold': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Bold.ttf'),
    'Outfit-ExtraBold': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-ExtraBold.ttf'),
    'Outfit-ExtraLight': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-ExtraLight.ttf'),
    'Outfit-Light': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Light.ttf'),
    'Outfit-Medium': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Medium.ttf'),
    'Outfit-Regular': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Regular.ttf'),
    'Outfit-SemiBold': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-SemiBold.ttf'),
    'Outfit-Thin': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Thin.ttf'),
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
    <View style={styles.container}>
      <View style={styles.img_container}>
        <Image
          // image by https://www.vecteezy.com/vector-art/23093053-artificial-intelligence-robot-chatbot-vector-ai-chatbot-concept-colored-icon
          source={require('@/assets/images/icon.png')}
          style={styles.img_style}
        />
      </View>
      <Button title="Get Started" />
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
    backgroundColor: "#ffdc00",
    borderRadius: 200,
    borderWidth: 4,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img_style: {
    width: 250,
    height: 250,
    resizeMode: 'contain'
  }
});
