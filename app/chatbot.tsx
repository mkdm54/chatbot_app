import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import useCustomFonts from '@/src/hooks/useCustomFonts';
import BubbleChat from '@/components/BubbleChat';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

interface ChatMessage {
    sendPrompt?: string;
    result?: string;
}

export default function Layout() {
    const [text, setText] = useState('');
    const [chatList, setChatList] = useState<ChatMessage[]>([]);
    const [loaded, error] = useCustomFonts();

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    const handleSend = () => {
        if (!text.trim()) return;

        const userMessage: ChatMessage = { sendPrompt: text };
        const botReply: ChatMessage = {
            result: 'Ini jawaban dummy untuk: ' + text,
        };

        setChatList([...chatList, userMessage, botReply]);
        setText('');
    };

    if (!loaded && !error) {
        return null;
    }

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

            <ScrollView style={{ flex: 1, width: '100%' }}>
                {chatList.map((chat, index) => (
                    <BubbleChat key={index} sendPrompt={chat.sendPrompt} result={chat.result} />
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
                <Pressable style={styles.iconContainer} onPress={handleSend}>
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
        marginBottom:15,
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
});
