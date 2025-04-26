import React, { useState, useRef } from "react";
import { View, StyleSheet, Pressable, Text, Clipboard, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface CopyButtonProps {
  resultCopy: string;
}

const CopyButton = ({ resultCopy }: CopyButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const shadowTranslateY = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    // Animasi tombol bergerak ke bawah saat ditekan
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shadowTranslateY, {
        toValue: 2,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    // Animasi tombol kembali ke posisi awal saat dilepas
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shadowTranslateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (!resultCopy.trim()) return;

    // Tetap menggunakan Clipboard asli
    Clipboard.setString(resultCopy);

    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <View style={styles.wrapper}>
      {showTooltip && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltip_text}>Teks disalin!</Text>
        </View>
      )}

      {/* Layer bayangan yang bergerak */}
      <Animated.View 
        style={[
          styles.shadow_layer, 
          { transform: [{ translateY: shadowTranslateY }] }
        ]}
      >
        <Icon name="content-copy" size={20} color="#ccc8c5" />
      </Animated.View>

      {/* Tombol utama yang bergerak */}
      <Animated.View 
        style={[
          styles.icon_container, 
          { transform: [{ translateY }] }
        ]}
      >
        <Pressable 
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Icon name="content-copy" size={20} color="#6a6054" />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    alignSelf: "flex-start",
    marginRight: 60,
    marginTop: -2,
    height: 38,
  },
  icon_container: {
    borderWidth: 4,
    borderColor: "#6a6054",
    padding: 5,
    borderRadius: 6,
    backgroundColor: "#90EE90",
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
  },
  shadow_layer: {
    position: "absolute",
    top: 5,
    left:-5,
    borderWidth: 4,
    borderColor: "#ccc8c5",
    backgroundColor: "#ccc8c5",
    padding: 5,
    borderRadius: 6,
    zIndex: 1,
  },
  tooltip: {
    position: "absolute",
    top: 45,
    left: 0,
    backgroundColor: "#6a6054",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 3,
  },
  tooltip_text: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Outfit-Medium",
  },
});

export default CopyButton;