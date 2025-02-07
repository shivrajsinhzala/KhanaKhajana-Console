// components/Sidebar.jsx
"use client";
import { motion } from "framer-motion";
import { useAdmin } from "../app/context/AdminContext";

export default function Sidebar() {
  const { activeSection, setActiveSection } = useAdmin();

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="w-64 bg-gradient-to-b from-[#5091E5] to-[#6BB1FF] text-white p-6 shadow-xl flex flex-col"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Khanakhajana
      </motion.h2>
      <nav className="mt-6 space-y-2 flex-1">
        {["dashboard", "updatePlans", "restaurantDetails"].map((section) => (
          <motion.button
            key={section}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(section)}
            className={`w-full text-left p-4 rounded-xl flex items-center space-x-3 ${
              activeSection === section
                ? "bg-[#6BB1FF]"
                : "hover:bg-[#6BB1FF]/80"
            }`}
          >
            <span className="capitalize">
              {section.replace(/([A-Z])/g, " $1")}
            </span>
          </motion.button>
        ))}
      </nav>
      <motion.hr className="my-6 border-t border-[#6BB1FF]/50" />
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/login";
        }}
        className="text-white bg-red-500 px-4 py-2 rounded-md w-full"
      >
        Logout
      </button>
    </motion.aside>
  );
}
