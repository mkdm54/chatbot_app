import React, { useEffect, forwardRef, useState } from 'react';
import { Text, View, StyleSheet, ViewStyle, Animated, Pressable } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import useCustomFonts from '@/src/hooks/useCustomFonts';

SplashScreen.preventAutoHideAsync();

interface TitleButton {
    title?: string;
    style?: ViewStyle;
    onPress?: () => void;
}

const Button = forwardRef<React.ElementRef<typeof Animated.View>, TitleButton>(({ title, style, onPress }, ref) => {
    const [loaded, error] = useCustomFonts();

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    const [scale] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.90,
            friction: 4,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
        >
            <Animated.View
                ref={ref}
                style={[styles.wrapper, { transform: [{ scale }] }, style]}
            >
                <View style={styles.shadow_button}>
                    <Text style={styles.hidden_text}>{title}</Text>
                </View>
                <View style={styles.button_style}>
                    <Text style={styles.text_style}>{title}</Text>
                </View>
            </Animated.View>
        </Pressable>
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
        backgroundColor: '#ccc8c5',
        borderWidth: 4,
        borderColor: '#ccc8c5',
    },
    hidden_text: {
        opacity: 0,
        fontSize: 30,
        fontFamily: 'Outfit-Medium',
    },
    button_style: {
        padding: 14,
        borderRadius: 15,
        backgroundColor: '#ffe854', 
        borderWidth: 4,
        borderColor: '#6a6054',
    },
    text_style: {
        color: '#6a6054',
        fontFamily: 'Outfit-Medium',
        fontSize: 30,
    },
});

export default Button;
