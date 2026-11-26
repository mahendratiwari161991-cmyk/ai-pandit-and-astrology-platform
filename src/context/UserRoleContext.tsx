"use client";

import React, { createContext, useContext, useState } from "react";
import { UserProfile, astrologyStore } from "@/lib/db/mock-store";

interface UserRoleContextType {
  currentUser: UserProfile;
  switchRole: (role: "customer" | "pandit" | "admin") => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(astrologyStore.users[0]);

  const switchRole = (role: "customer" | "pandit" | "admin") => {
    const targetUser = astrologyStore.users.find((u) => u.role === role) || astrologyStore.users[0];
    setCurrentUser(targetUser);
  };

  return (
    <UserRoleContext.Provider value={{ currentUser, switchRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    return {
      currentUser: astrologyStore.users[0],
      switchRole: () => {},
    };
  }
  return context;
};
