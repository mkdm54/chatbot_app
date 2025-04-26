import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: string;
  setUser: (user: string) => void;
  profileImage: string;
  setProfileImage: (image: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState("");
  const [profileImage, setProfileImage] = useState("");

  return (
    <UserContext.Provider
      value={{ user, setUser, profileImage, setProfileImage }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
