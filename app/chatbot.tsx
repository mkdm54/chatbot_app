import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    },
    input: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'Outfit-Medium',
        color : '#6a6054',
    },
    iconContainer: {
        marginLeft: 10,
        padding: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
});
