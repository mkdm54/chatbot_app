// components/CustomHeader.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constant/Color";

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.yellow_background,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 4,
    borderBottomColor: Colors.light.border_color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  titleText: {
    fontSize: 20,
    color: Colors.light.text,
    textAlign: "center",
    fontFamily: "Outfit-Medium",
  },
});
