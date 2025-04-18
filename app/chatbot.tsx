import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import useCustomFonts from '@/src/hooks/useCustomFonts';
import BubbleChat from '@/components/BubbleChat';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

interface ChatMessage {
    sendPrompt?: string;
    result?: string;
    isLoading?: boolean;
}

export default function Layout() {
    const [text, setText] = useState('');
    const [chatList, setChatList] = useState<ChatMessage[]>([]);
    const [loaded, error] = useCustomFonts();

    // Konstanta untuk API
    const OPENROUTER_API_KEY = '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';
    const YOUR_SITE_URL = 'http://localhost:8081';
    const YOUR_SITE_NAME = 'NOVA AI';

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    const fetchOpenRouterResponse = async (prompt: string) => {
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": YOUR_SITE_URL,
                    "X-Title": YOUR_SITE_NAME,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "deepseek/deepseek-r1:free",
                    "messages": [
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ]
                })
            });

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Error fetching response:", error);
            return "Maaf, terjadi kesalahan dalam memproses permintaan Anda.";
        }
    };

    const handleSend = async () => {
        if (!text.trim()) return;

        const userMessage: ChatMessage = { sendPrompt: text };
        setChatList(prevList => [...prevList, userMessage]);

        // Tambahkan pesan loading dalam bubble chat
        const loadingBotMessage: ChatMessage = { result: "", isLoading: true };
        setChatList(prevList => [...prevList, loadingBotMessage]);

        const userPrompt = text;
        setText('');

        // Dapatkan respons dari API
        const aiResponse = await fetchOpenRouterResponse(userPrompt);

        // Update pesan bot dengan respons yang sebenarnya
        setChatList(prevList => {
            const newList = [...prevList];
            newList[newList.length - 1] = { result: aiResponse, isLoading: false };
            return newList;
        });
    };

    if (!loaded && !error) {
        return null;
    }

    // Modifikasi BubbleChat untuk menampilkan loading
    const CustomBubbleChat = ({ sendPrompt, result, isLoading }: ChatMessage) => {
        if (sendPrompt) {
            return <BubbleChat sendPrompt={sendPrompt} />;
        }

        if (isLoading) {
            return (
                <View style={styles.wrapper}>
                    {/* Shadow */}
                    <View style={[styles.bubble, styles.bubble_left_shadow]} />
                    {/* Main bubble with loading indicator */}
                    <View style={[styles.bubble, styles.bubble_left]}>
                        <ActivityIndicator size="small" color="#6a6054" />
                    </View>
                </View>
            );
        }

        return <BubbleChat result={result} />;
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: '',
                    headerStyle: { backgroundColor: '#f4511e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerBackVisible: false,
                }}
            />

            <ScrollView
                style={{ flex: 1, width: '100%' }}
                contentContainerStyle={{ paddingBottom: 20 }}
                ref={ref => {
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
                    <Icon name="send" size={20} color="#6a6054" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 4,
        borderColor: '#6a6054',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        width: 370,
        backgroundColor: '#fff',
        position: 'relative',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'Outfit-Medium',
        color: '#6a6054',
    },
    iconShadow: {
        borderWidth: 4,
        borderColor: '#ccc8c5',
        position: 'absolute',
        right: 9.4,
        bottom: 5.4,
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#ccc8c5',
        zIndex: 0,
    },
    iconContainer: {
        borderColor: '#6a6054',
        borderWidth: 4,
        marginLeft: 10,
        padding: 12,
        backgroundColor: '#ffD850',
        borderRadius: 10,
        zIndex: 1,
    },
    wrapper: {
        position: 'relative',
        marginVertical: 10,
        marginLeft: 10,
    },
    bubble: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#6a6054',
        position: 'relative',
        zIndex: 2,
    },
    bubble_left: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 0,
        marginLeft: 0,
        minWidth: 50,
    },
    bubble_left_shadow: {
        alignSelf: 'flex-start',
        backgroundColor: '#ccc8c5',
        borderColor: '#ccc8c5',
        position: 'absolute',
        top: 7,
        left: -7,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 10,
        minWidth: 50,
        height: '100%',
        zIndex: 1,
    }
});