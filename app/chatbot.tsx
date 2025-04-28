import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import useCustomFonts from "@/hooks/useCustomFonts";
import BubbleChat from "@/components/BubbleChat";
import CopyButton from "@/components/CopyButton";
import * as SplashScreen from "expo-splash-screen";
import { fetchOpenRouterResponse } from "@/src/api/deepseek_api";
import { Colors } from "@/constant/Color";
import { useUser } from "@/context/UserContext";

SplashScreen.preventAutoHideAsync();

interface ChatMessage {
  sendPrompt?: string;
  result?: string;
  isLoading?: boolean;
}

export default function ChatBot() {
  const { user, profileImage } = useUser();
  const [text, setText] = useState("");
  const [chatList, setChatList] = useState<ChatMessage[]>([]);
  const [loaded, error] = useCustomFonts();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Hide welcome message when chat starts
  useEffect(() => {
    if (chatList.length > 0) {
      setShowWelcome(false);
    }
  }, [chatList]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { sendPrompt: text };
    setChatList((prevList) => [...prevList, userMessage]);

    const loadingBotMessage: ChatMessage = { result: "", isLoading: true };
    setChatList((prevList) => [...prevList, loadingBotMessage]);

    const userPrompt = text;
    setText("");

    const aiResponse = await fetchOpenRouterResponse(userPrompt);

    setChatList((prevList) => {
      const newList = [...prevList];
      newList[newList.length - 1] = { result: aiResponse, isLoading: false };
      return newList;
    });
  };

  if (!loaded && !error) return null;

  const CustomBubbleChat = ({ sendPrompt, result, isLoading }: ChatMessage) => {
    if (sendPrompt) return <BubbleChat sendPrompt={sendPrompt} />;
    if (isLoading)
      return (
        <View style={styles.wrapper}>
          <View style={[styles.bubble, styles.bubble_left_shadow]} />
          <View style={[styles.bubble, styles.bubble_left]}>
            <ActivityIndicator size="small" color={Colors.light.text} />
          </View>
        </View>
      );

    return (
      <View style={{ marginBottom: 10 }}>
        <BubbleChat result={result} />
        <View style={{ paddingLeft: 10, marginTop: 5 }}>
          <CopyButton resultCopy={result || ""} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          paddingBottom: 20,
          ...(showWelcome && chatList.length === 0
            ? { flex: 1, justifyContent: "center" }
            : {}),
        }}
        ref={(ref) => {
          if (ref && chatList.length > 0) {
            ref.scrollToEnd({ animated: true });
          }
        }}
      >
        {/* Welcome message that disappears when chat starts */}
        {showWelcome && chatList.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <View style={styles.profileShadowWrapper}>
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("@/assets/images/default-profile.png")
                }
                style={[styles.profileImageShadow, {tintColor: Colors.light.shadow_color }]}
              />
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("@/assets/images/icon.png")
                }
                style={styles.profileImage}
              />
            </View>

            <Text style={styles.welcomeTitle}>Selamat Datang {user ? user : "Pengguna"}</Text>
            <Text style={styles.welcomeHint}>
              Silahkan ketik pertanyaan Anda di kolom bawah.
            </Text>
          </View>
        ) : (
          // Chat messages
          chatList.map((chat, index) => (
            <CustomBubbleChat
              key={index}
              sendPrompt={chat.sendPrompt}
              result={chat.result}
              isLoading={chat.isLoading}
            />
          ))
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={[styles.input, { maxHeight: 120 }]}
          onChangeText={setText}
          value={text}
          placeholder="Tanyakan apa saja"
          placeholderTextColor={Colors.light.placeholder_color}
        />
        <View style={styles.sendButtonContainer}>
          <View style={styles.iconShadow} />
          <Pressable
            style={styles.iconContainer}
            onPress={handleSend}
            disabled={!text.trim()}
          >
            <Icon name="send" size={20} color={Colors.light.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    paddingBottom: 0,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
    color: Colors.light.text,
    fontFamily: "Outfit-Bold",
  },
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.light.text,
    fontFamily: "Outfit-Bold",
    textAlign: "center",
  },
  welcomeHint: {
    fontSize: 16,
    color: Colors.light.placeholder_color,
    fontFamily: "Outfit-Regular",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 4,
    borderColor: Colors.light.border_color,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    width: "100%",
    maxWidth: 370,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontFamily: "Outfit-Medium",
    color: Colors.light.text,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
  sendButtonContainer: {
    position: "relative",
    marginLeft: 10,
    width: 50,
    height: 50,
  },
  iconShadow: {
    borderWidth: 4,
    borderColor: Colors.light.shadow_color,
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.light.shadow_color,
    zIndex: 0,
  },
  iconContainer: {
    borderColor: Colors.light.border_color,
    borderWidth: 4,
    padding: 12,
    backgroundColor: "#ffD850",
    borderRadius: 10,
    zIndex: 1,
    width: 50,
    height: 50,
  },
  wrapper: {
    position: "relative",
    marginVertical: 10,
    marginLeft: 10,
  },
  bubble: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: Colors.light.border_color,
    position: "relative",
    zIndex: 2,
  },
  bubble_left: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 0,
    marginLeft: 0,
    minWidth: 50,
  },
  bubble_left_shadow: {
    alignSelf: "flex-start",
    backgroundColor: Colors.light.shadow_color,
    borderColor: Colors.light.shadow_color,
    position: "absolute",
    top: 7,
    left: -7,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    minWidth: 50,
    height: "100%",
    zIndex: 1,
  },
  profileShadowWrapper: {
    position: "relative",
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  profileImageShadow: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: Colors.light.shadow_color,
    backgroundColor: Colors.light.shadow_color,
    zIndex: 0,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#fff",
    zIndex: 1,
  },
});
