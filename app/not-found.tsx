import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constant/Color";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/404.png")} style={[styles.image, {tintColor: Colors.light.red}]} />
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
    fontWeight: "bold",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.light.border_color,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Outfit-Medium",
  },
});
