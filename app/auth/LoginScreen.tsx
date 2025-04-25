import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Image,
} from "react-native";
import { Colors } from "@/constant/Color";
import { loginUser } from "@/src/api/dummyAuthApi";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import useCustomFonts from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function LoginScreen() {
  const router = useRouter();
  const [loaded, error] = useCustomFonts();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

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
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.img_style}
      />
      <View style={styles.wrapper}>
        <View style={styles.inputContainer}>
          <Icon
            name="user"
            size={25}
            color={Colors.light.border_color}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="lock"
            size={25}
            color={Colors.light.border_color}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={secureText}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={toggleSecureText}
            style={styles.eyeIconContainer}
          >
            <Icon
              name={secureText ? "eye-off" : "eye"}
              size={25}
              color={Colors.light.text}
            />
          </TouchableOpacity>
        </View>

        <Button
          title="Login"
          style={styles.button_component_style}
          onPress={handleLogin}
        />
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    borderColor: Colors.light.border_color,
    borderWidth: 4,
    marginBottom: 15,
    borderRadius: 10,
    position: "relative",
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "auto",
    color: Colors.light.text,
    fontFamily: "Outfit-Medium",
    fontSize: 18,
    paddingRight: 45,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 15,
    height: "100%",
    justifyContent: "center",
  },
  button_component_style: {
    alignSelf: "center",
    width: "auto",
  },
  img_style: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderColor: Colors.light.border_color,
  },
});
