import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import useCustomFonts from '@/src/hooks/useCustomFonts';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [text, onChangeText] = React.useState('');
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
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: '',
                    headerStyle: { backgroundColor: '#f4511e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Tanyakan apa saja"
                    placeholderTextColor="#999"
                />
                
                {/* Bayangan di belakang ikon */}
                <View style={styles.iconShadow} />

                {/* Icon sebenarnya */}
                <Pressable style={styles.iconContainer} onPress={() => console.log("Kirim:", text)}>
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
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 4,
        borderColor: '#6a6054',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        position: 'relative',
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
        backgroundColor: '#ffe854',
        borderRadius: 10,
        zIndex: 1,
    },
});
