// src/hooks/useCustomFonts.ts
import { useFonts } from 'expo-font';

export default function useCustomFonts() {
    return useFonts({
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
}
