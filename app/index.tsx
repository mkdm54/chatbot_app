import { Text, View, StyleSheet, Image } from "react-native";
import Button from "@/components/Button";

export default function Index() {
  return (
      <View style={styles.container}>
        <Image
          // image by https://www.vecteezy.com/vector-art/23093053-artificial-intelligence-robot-chatbot-vector-ai-chatbot-concept-colored-icon
          source={require('@/assets/images/icon.png')}
          style={styles.img_style}
        />
        <Button title="Get Started"/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Outfit-Medium"
  },
  img_style: {
    width: 300,
    height: 300
  }
})