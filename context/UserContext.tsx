import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: string;
  setUser: (user: string) => void;
  name: string;
  setName: (name: string) => void;
  profileImage: string;
  setProfileImage: (image: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  birthDate: string;
  setBirthDate: (birthDate: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const value = {
    user,
    setUser,
    name,
    setName,
    profileImage,
    setProfileImage,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    birthDate,
    setBirthDate,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
