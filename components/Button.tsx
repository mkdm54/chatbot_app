import React, { useEffect, forwardRef, } from 'react';
import { Text, View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

interface TitleButton {
    title?: string;
    style?: ViewStyle;
    onPress?: () => void;
}

const Button = forwardRef<React.ElementRef<typeof TouchableOpacity>, TitleButton>(({ title, style, onPress }, ref) => {
    const [loaded, error] = useFonts({
        'Outfit-Black': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Black.ttf'),
        'Outfit-Bold': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Bold.ttf'),
        'Outfit-ExtraBold': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-ExtraBold.ttf'),
        'Outfit-ExtraLight': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-ExtraLight.ttf'),
        'Outfit-Light': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Light.ttf'),
        'Outfit-Medium': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Medium.ttf'),
        'Outfit-Regular': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Regular.ttf'),
        'Outfit-SemiBold': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-SemiBold.ttf'),
        'Outfit-Thin': require('@/assets/fonts/Outfit,Poppins/Outfit/static/Outfit-Thin.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <TouchableOpacity ref={ref} style={[styles.wrapper, style]} onPress={onPress} activeOpacity={0.5}>
            <View style={styles.shadow_button}>
                <Text style={styles.hidden_text}>{title}</Text>
            </View>
            <View style={styles.button_style}>
                <Text style={styles.text_style}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    shadow_button: {
        position: 'absolute',
        top: 7,
        left: 7,
        padding: 14,
        borderRadius: 15,
        backgroundColor: '#000',
        borderWidth: 4,
        borderColor: '#000',
    },
    hidden_text: {
        opacity: 0,
        fontSize: 30,
        fontFamily: 'Outfit-Medium',
    },
    button_style: {
        padding: 14,
        borderRadius: 15,
        backgroundColor: '#ffdc00',
        borderWidth: 4,
        borderColor: '#000000',
    },
    text_style: {
        fontFamily: 'Outfit-Medium',
        fontSize: 30,
    },
});

export default Button;