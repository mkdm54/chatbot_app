import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Colors } from "@/constant/Color";

interface CustomHeaderProps {
  img?: ImageSourcePropType; // optional
  title: string;
  profileImage?: string; // optional
  username?: string; // optional
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  img,
  profileImage,
  username,
}) => {
  return (
    <View style={styles.container}>
      {img && <Image source={img} style={styles.image} resizeMode="contain" />}

      <Text style={styles.titleText}>{title}</Text>

      {/* This line is problematic - it always shows "Bot" */}
      {username && <Text style={styles.usernameText}>{username}</Text>}

      {profileImage && (
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("@/assets/images/icon.png")
          }
          style={styles.profileImage}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.yellow_background,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 4,
    borderBottomColor: Colors.light.border_color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
    marginRight: 10,
  },
  titleText: {
    fontSize: 20,
    color: Colors.light.text,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
  },
  usernameText: {
    fontSize: 14,
    color: Colors.light.text,
    marginLeft: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
});
