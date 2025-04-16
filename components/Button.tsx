import { Text, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()

interface TitleButton {
    title?: string
}

const Button = ({ title }: TitleButton) => {
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
        <View style={styles.wrapper}>
            {/* Shadow hitam pekat di bawah tombol */}
            <View style={styles.shadow_button}>
                <Text style={styles.hidden_text}>{title}</Text>
            </View>

            {/* Tombol utama */}
            <View style={styles.button_style}>
                <Text style={styles.text_style}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        top : 20,
    },
    shadow_button: {
        position: 'absolute',
        top: 7,
        left: 7,
        padding: 14,
        borderRadius: 20,
        backgroundColor: '#000',
        borderWidth: 4,
        borderColor: '#000',
    },
    hidden_text: {
        opacity: 0,
        fontSize: 30,
        fontFamily: "Outfit-Medium",
    },
    button_style: {
        padding: 14,
        borderRadius: 20,
        backgroundColor: "#ffdc00",
        borderWidth: 4,
        borderColor: '#000000',
    },
    text_style: {
        fontFamily: "Outfit-Medium",
        fontSize: 30,
    }
});

export default Button;
