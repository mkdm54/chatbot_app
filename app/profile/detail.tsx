import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";
import { Colors } from "@/constant/Color";
import { router } from "expo-router";

const ProfileScreen = () => {
  const {
    name,
    user,
    profileImage,
    email,
    phoneNumber,
    birthDate,
    setUser,
    setName,
    setEmail,
    setProfileImage,
    setPhoneNumber,
    setBirthDate,
  } = useUser();

  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleLogout = () => {
    Alert.alert("Konfirmasi Logout", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Reset semua state di UserContext
          setUser("");
          setName("");
          setEmail("");
          setProfileImage("");
          setPhoneNumber("");
          setBirthDate("");

          // Arahkan ke halaman login
          router.replace("/auth/LoginScreen");
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("@/assets/images/default-profile.png")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon}>
            <Feather name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.logoutButtonContainer}>
          <View style={styles.logoutButtonShadow}>
            <Ionicons
              name="log-out-outline"
              size={20}
              color="transparent"
              style={styles.logoutIcon}
            />
            <Text style={[styles.logoutText, { color: "transparent" }]}>
              Logout
            </Text>
          </View>
          {/* Main Button Layer */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="white"
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainerWrapper}>
        {/* Shadow/Duplicate Layer */}
        <View style={styles.infoContainerShadow}>
          {/* Empty duplicate container for shadow effect */}
        </View>
        {/* Main Info Container */}
        <View style={styles.infoContainer}>
          <InfoItem icon="person" label="Nama" value={name} />
          <InfoItem icon="person-outline" label="Nama Pengguna" value={user} />
          <InfoItem icon="email" label="Email" value={email} />
          <InfoItem icon="call" label="Nomor Telepon" value={phoneNumber} />
          <InfoItem
            icon="calendar-today"
            label="Tanggal Lahir"
            value={birthDate}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => {
  return (
    <View style={styles.infoItem}>
      <View style={styles.infoRow}>
        <MaterialIcons name={icon as any} size={20} color={Colors.light.text} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity>
          <Feather name="edit" size={18} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.light.border_color,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    padding: 6,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: Colors.light.border_color,
  },
  logoutButtonContainer: {
    position: "relative",
    width: 140,
    height: 55,
  },
  logoutButtonShadow: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: Colors.light.shadow_color || "#CCCCCC",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: Colors.light.shadow_color || "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    top: 4,
    left: 4,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  logoutButton: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: Colors.light.border_color,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 4,
    bottom: 4,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Outfit-Medium",
  },
  infoContainerWrapper: {
    position: "relative",
    marginBottom: 20,
    width: "100%",
    height: 400,
  },
  infoContainerShadow: {
    position: "absolute",
    backgroundColor: Colors.light.shadow_color,
    borderRadius: 12,
    top: 6,
    left: 6,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  infoContainer: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 4,
    borderColor: Colors.light.border_color,
    top: 0,
    left: 0,
    right: 6,
    bottom: 6,
    zIndex: 2,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: "gray",
  },
  infoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border_color,
    paddingBottom: 5,
  },
  value: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: "Outfit-Medium",
  },
});
