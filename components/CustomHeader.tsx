import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constant/Color";

interface CustomHeaderProps {
  img?: ImageSourcePropType; // optional
  title: string;
  profileImage?: string; // optional
  username?: string; // optional
  onPressUsername?: () => void; // tambahan untuk klik username
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  img,
  profileImage,
  username,
  onPressUsername,
}) => {
  return (
    <View style={styles.container}>
      {/* LEFT SIDE: Icon + Title */}
      <View style={styles.leftContainer}>
        {img && (
          <Image source={img} style={styles.image} resizeMode="contain" />
        )}
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {/* RIGHT SIDE: Username + Profile Image */}
      {(username || profileImage) && (
        <View style={styles.profileContainer}>
          {username && (
            <TouchableOpacity onPress={onPressUsername}>
              <Text style={styles.usernameText}>{username}</Text>
            </TouchableOpacity>
          )}
          {profileImage && (
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("@/assets/images/no-foto.jpg")
              }
              style={styles.profileImage}
              resizeMode="cover"
            />
          )}
        </View>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 4,
    borderBottomColor: Colors.light.border_color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // <--- ini kunci, antara kiri-kanan
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  titleText: {
    fontSize: 20,
    color: Colors.light.text,
    fontFamily: "Outfit-Bold",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  usernameText: {
    fontSize: 14,
    color: Colors.light.text,
    marginRight: 8,
    textDecorationLine: "underline",
    fontFamily: "Outfit-Medium",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.light.border_color,
  },
});
