import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Layout() {
    return (
        <View>
            <Stack.Screen
                options={{
                    title: '',
                    headerStyle: { backgroundColor: '#f4511e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Text>
                halo
            </Text>
        </View>
    );
}
