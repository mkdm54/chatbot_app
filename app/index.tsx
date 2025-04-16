import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        // image by https://www.vecteezy.com/vector-art/23093053-artificial-intelligence-robot-chatbot-vector-ai-chatbot-concept-colored-icon
        source={require('@/assets/images/icon.png')}
        style={styles.img_style}
      />
      <Text>get started</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img_style: {
    width: 300,
    height: 300
  }
})