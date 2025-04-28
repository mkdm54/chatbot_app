import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

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

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color="white"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Information Form */}
      <View style={styles.infoContainer}>
        <InfoItem icon="person" label="Name" value={name} />
        <InfoItem icon="person-outline" label="Username" value={user} />
        <InfoItem icon="email" label="Email id" value={email} />
        <InfoItem icon="call" label="Phone number" value={phoneNumber} />
        <InfoItem icon="calendar-today" label="Birth Date" value={birthDate} />
      </View>

      {/* Terms and Privacy */}
      <View style={styles.bottomText}>
        <Text style={styles.bottomLinkText}>
          Read all <Text style={styles.link}>Terms of Condition</Text>
          <Text> And </Text>
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
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
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: Colors.light.border_color,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 4,
    borderColor: Colors.light.border_color,
    marginBottom: 20,
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
  bottomText: {
    alignItems: "center",
    marginBottom: 30,
  },
  bottomLinkText: {
    fontSize: 12,
    color: "gray",
  },
  link: {
    color: "#0B5FFF",
    textDecorationLine: "underline",
  },
});
