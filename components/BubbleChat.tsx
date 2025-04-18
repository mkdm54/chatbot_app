import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import useCustomFonts from "@/src/hooks/useCustomFonts";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

interface typeChat {
    sendPrompt?: string;
    result?: string;
};

const BubbleChat = ({ sendPrompt, result }: typeChat) => {
    const [loaded, error] = useCustomFonts();

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={styles.chat_container}>
            {sendPrompt ? (
                <View style={[styles.bubble, styles.bubble_right]}>
                    <Text style={styles.text}>{sendPrompt}</Text>
                </View>
            ) : null}

            {result ? (
                <View style={[styles.bubble, styles.bubble_left]}>
                    <Text style={styles.text}>{result}</Text>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    chat_container: {
        width: 380,
        alignItems: 'flex-start', // penting!
        paddingHorizontal: 10,
        marginTop: 10,
    },
    bubble: {
        maxWidth: 'auto',
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
    },
    bubble_right: {
        alignSelf: 'flex-end', borderWidth: 4,
        borderColor: '#6a6054',
        backgroundColor: '#ffe854',
        borderTopRightRadius: 0,
        marginRight: 0,
    },
    bubble_left: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        borderWidth: 4,
        borderColor: '#6a6054',
        borderTopLeftRadius: 0,
        marginLeft: 0,
    },
    text: {
        fontFamily: 'Outfit-Medium',
        fontSize: 16,
        color: '#6a6054',
    }
});


export default BubbleChat;
