import { Text, View, StyleSheet, Image } from "react-native";
import Button from "@/components/Button";

export default function Index() {
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
    fontFamily: "Outfit-Medium"
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
