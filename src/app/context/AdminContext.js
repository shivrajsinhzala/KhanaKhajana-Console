// context/AdminContext.js
"use client";
import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  return (
    <AdminContext.Provider
      value={{
        activeSection,
        setActiveSection,
        restaurantDetails,
        setRestaurantDetails,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
