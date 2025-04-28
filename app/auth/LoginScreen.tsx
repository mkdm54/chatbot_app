import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constant/Color";
import { loginUser } from "@/src/api/dummyAuthApi";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import useCustomFonts from "@/hooks/useCustomFonts";
import * as SplashScreen from "expo-splash-screen";
import { useUser } from "@/context/UserContext";
import CustomMessage from "@/components/CustomMessage";

SplashScreen.preventAutoHideAsync();

export default function LoginScreen() {
  const externalLinkIcon = (
    <Icon name="external-link" size={20} color={Colors.light.text} />
  );
  const {
    setUser,
    setName,
    setProfileImage,
    setEmail,
    setPhoneNumber,
    setBirthDate,
  } = useUser();
  const router = useRouter();
  const [loaded, error] = useCustomFonts();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const startErrorTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setMessage("");
      setIsSubmitted(false);
    }, 3000);
    setTimeoutId(id);
  };

  const handleLogin = async () => {
    setIsSubmitted(true);
    if (!username.trim() || !password.trim()) {
      setMessage("Username dan password tidak boleh kosong");
      startErrorTimeout();
      return;
    }

    try {
      setIsLoading(true); // Aktifkan loading
      const data = await loginUser(username, password);
      const userId = data.id;

      console.log("Login result:", data.username);
      if (data && data.accessToken) {
        setName(data.firstName);
        setUser(data.username);
        setEmail(data.email);
        setProfileImage(data.image);

        try {
          const userDetailResponse = await fetch(
            `https://dummyjson.com/users/${userId}`
          );
          const userDetail = await userDetailResponse.json();

          setPhoneNumber(userDetail.phone);
          setBirthDate(userDetail.birthDate);
        } catch (detailError) {
          console.error("Error fetching user details:", detailError);
        }

        setMessage("Login berhasil....");

        setTimeout(() => {
          setIsLoading(false); // Matikan loading
          setIsSubmitted(false);
          router.push("/chatbot");
        }, 2000);
      } else {
        setIsLoading(false);
        setMessage(
          "Login Gagal, mohon periksa nama pengguna dan password Anda."
        );
        startErrorTimeout();
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("Terjadi kesalahan saat login.");
      startErrorTimeout();
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
            placeholderTextColor={Colors.light.placeholder_color}
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
            placeholderTextColor={Colors.light.placeholder_color}
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

        {isSubmitted && message && (
          <CustomMessage
            message={message}
            type={message.includes("berhasil") ? "success" : "error"}
            isLoading={isLoading}
          />
        )}
        <Button
          title={isLoading ? "Memproses..." : "Masuk"}
          style={styles.button_component_style}
          onPress={handleLogin}
        />

        <View style={{ alignItems: "center", marginTop: 35 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.signupText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => router.push("/not-found")}>
              <Text style={styles.signupLink}>
                Daftar di sini {externalLinkIcon}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    height: 75,
    top: 20,
  },
  img_style: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderColor: Colors.light.border_color,
  },
  signupText: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: "Outfit-Regular",
  },
  signupLink: {
    fontSize: 16,
    color: Colors.light.border_color,
    fontWeight: "bold",
    fontFamily: "Outfit-Medium",
  },
});
