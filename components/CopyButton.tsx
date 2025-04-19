import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CopyButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handlePress = () => {
        setShowTooltip(true);

        // Sembunyikan tooltip setelah 2 detik
        setTimeout(() => {
            setShowTooltip(false);
        }, 2000);
    };

    return (
        <View style={styles.wrapper}>
            {/* Tooltip */}
            {showTooltip && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltip_text}>Salin</Text>
                </View>
            )}

            {/* Shadow 3D */}
            <View style={[styles.icon_container, styles.shadow_layer]}>
                <Icon name="content-copy" size={20} color="#ccc8c5" />
            </View>

            {/* Tombol utama */}
            <Pressable style={styles.icon_container} onPress={handlePress}>
                <Icon name="content-copy" size={20} color="#6a6054" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        alignSelf: 'flex-end',
        marginRight: 60,
        marginTop: -2,
    },
    icon_container: {
        borderWidth: 4,
        borderColor: '#6a6054',
        padding: 5,
        borderRadius: 6,
        backgroundColor: '#90EE90',
        zIndex: 2,
    },
    shadow_layer: {
        position: 'absolute',
        top: 4,
        left: 4,
        borderColor: '#ccc8c5',
        backgroundColor: '#ccc8c5',
        zIndex: 1,
    },
    tooltip: {
        position: 'absolute',
        top: 45,
        left: 2,
        backgroundColor: '#6a6054',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginBottom: 4,
        zIndex: 3,
    },
    tooltip_text: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Outfit-Medium',
    },
});

export default CopyButton;
