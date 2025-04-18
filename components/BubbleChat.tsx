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
            {sendPrompt && (
                <View style={styles.wrapper}>
                    {/* Shadow */}
                    <View style={[styles.bubble, styles.bubble_right_shadow]} />
                    {/* Main bubble */}
                    <View style={[styles.bubble, styles.bubble_right]}>
                        <Text style={styles.text}>{sendPrompt}</Text>
                    </View>
                </View>
            )}

            {result && (
                <View style={styles.wrapper}>
                    {/* Shadow */}
                    <View style={[styles.bubble, styles.bubble_left_shadow]} />
                    {/* Main bubble */}
                    <View style={[styles.bubble, styles.bubble_left]}>
                        <Text style={styles.text}>{result}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    chat_container: {
        flex: 1,
        width: 380,
        display: 'flex',
        paddingHorizontal: 10,
        marginTop: 5,
    },
    wrapper: {
        position: 'relative',
        marginVertical: 10,
    },
    bubble: {
        maxWidth: 'auto',
        padding: 10,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: '#6a6054',
        position: 'relative',
        zIndex: 2,
    },
    bubble_right: {
        alignSelf: 'flex-end',
        backgroundColor: '#ffe854',
        borderTopRightRadius: 0,
        marginRight: 0,
    },
    bubble_left: {
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 0,
        marginLeft: 0,
    },
    bubble_right_shadow: {
        alignSelf: 'flex-end',
        backgroundColor: '#ccc8c5',
        borderColor: '#ccc8c5',
        position: 'absolute',
        top: 7,
        right: -7,
        borderRadius: 15,
        borderTopRightRadius: 0,
        width: 180,
        height: '100%',
        zIndex: 1,
    },
    bubble_left_shadow: {
        alignSelf: 'flex-start',
        backgroundColor: '#ccc8c5',
        borderColor: '#ccc8c5',
        position: 'absolute',
        top: 7,
        left: -7,
        borderRadius: 15,
        borderTopLeftRadius: 0,
        width: 345,
        height: '100%',
        zIndex: 1,
    },
    text: {
        fontFamily: 'Outfit-Medium',
        fontSize: 16,
        color: '#6a6054',
    }
});

export default BubbleChat;
