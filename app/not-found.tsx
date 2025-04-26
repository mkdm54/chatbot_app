import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constant/Color";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/404.png")}
        style={[styles.image, { tintColor: Colors.light.red_v1 }]}
      />
      <Text style={styles.code_404}>404</Text>
      <Text style={styles.title}>Oops! Halaman tidak ditemukan</Text>
      <Text style={styles.description}>
        Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth/LoginScreen")}
      >
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Outfit-Bold",
  },
  description: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Outfit-Medium",
  },
  button: {
    borderWidth: 4,
    borderColor: Colors.light.border_color,
    backgroundColor: Colors.light.red_v1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Outfit-Medium",
  },
  code_404 : {
    fontSize: 40,
    color: Colors.light.red_v1,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Outfit-Bold",
  }
});
