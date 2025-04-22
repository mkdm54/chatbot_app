import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { Stack } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import useCustomFonts from "@/src/hooks/useCustomFonts";
import BubbleChat from "@/components/BubbleChat";
import CopyButton from "@/components/CopyButton";
import * as SplashScreen from "expo-splash-screen";
import { fetchOpenRouterResponse } from "@/src/api/deepseak_api"; // Import API
import { Colors } from "@/constant/Color";

SplashScreen.preventAutoHideAsync();

interface ChatMessage {
  sendPrompt?: string;
  result?: string;
  isLoading?: boolean;
}

export default function ChatBot() {
  const [text, setText] = useState("");
  const [chatList, setChatList] = useState<ChatMessage[]>([]);
  const [loaded, error] = useCustomFonts();

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
        style={{ flex: 1, width: "auto" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={(ref) => {
          if (ref && chatList.length > 0) {
            ref.scrollToEnd({ animated: true });
          }
        }}
      >
        {chatList.map((chat, index) => (
          <CustomBubbleChat
            key={index}
            sendPrompt={chat.sendPrompt}
            result={chat.result}
            isLoading={chat.isLoading}
          />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Tanyakan apa saja"
          placeholderTextColor="#999"
        />
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
  inputContainer: {
    flexDirection: "row",
    borderWidth: 4,
    borderColor: Colors.light.border_color,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    width: 370,
    backgroundColor: "#fff",
    position: "relative",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontFamily: "Outfit-Medium",
    color: Colors.light.text, // color text input
  },
  iconShadow: {
    borderWidth: 4,
    borderColor: Colors.light.shadow_color,
    position: "absolute",
    right: 9.4,
    bottom: 5.4,
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.light.shadow_color,
    zIndex: 0,
  },
  iconContainer: {
    borderColor: Colors.light.border_color,
    borderWidth: 4,
    marginLeft: 10,
    padding: 12,
    backgroundColor: "#ffD850",
    borderRadius: 10,
    zIndex: 1,
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
});
