import { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { loginUser } from "@/src/api/dummyAuthApi";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      return Alert.alert("Error", "Username dan password tidak boleh kosong");
    }

    try {
      const data = await loginUser(username, password);
      console.log("Login result:", data);

      if (data && data.accessToken) {
        Alert.alert(
          "Login Berhasil",
          `Selamat datang, ${data.firstName || data.username}!`,
          [{ text: "OK", onPress: () => router.push("/chatbot") }]
        );
      } else {
        Alert.alert(
          "Login Gagal",
          data.error || "Periksa kembali username dan password"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat login");
    }
  };

  const toggleSecureText = () => {
    setSecureText((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          placeholder="Username"
          style={styles.username_input}
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="Password"
            secureTextEntry={secureText}
            style={styles.password_input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={toggleSecureText}
            style={styles.iconContainer}
          >
            <Icon
              name={secureText ? "eye-off" : "eye"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "80%",
  },
  username_input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  password_input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingRight: 40, // memberikan ruang untuk ikon mata
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
