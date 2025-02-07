// src/app/login/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(
        "https://khanakhajana-f7r6.onrender.com/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin"); // Redirect to admin panel after login
      } else {
        setLoginError(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#5091E5] to-[#6BB1FF]">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogin}
        className="p-8 border rounded-2xl shadow-2xl bg-white transform transition-all duration-300 w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#5091E5] to-[#6BB1FF] bg-clip-text text-transparent">
          Khanakhajana Admin
        </h2>
        {loginError && (
          <div className="text-red-500 text-sm mb-4">{loginError}</div>
        )}
        <motion.div whileFocus={{ scale: 1.05 }} className="mb-4">
          <input
            type="text"
            name="email"
            placeholder="Username"
            className="border-2 border-gray-200 p-3 w-full rounded-lg focus:outline-none focus:border-[#5091E5] transition-all text-black"
            required
          />
        </motion.div>
        <motion.div whileFocus={{ scale: 1.05 }} className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-2 text-black border-gray-200 p-3 w-full rounded-lg focus:outline-none focus:border-[#5091E5] transition-all"
            required
          />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-[#5091E5] text-white px-6 py-3 rounded-lg w-full font-semibold shadow-lg hover:shadow-[#5091E5]/50 transition-all"
        >
          Login
        </motion.button>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-sm text-[#5091E5] hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="text-sm text-[#5091E5] hover:underline"
          >
            Don't have an account? Register
          </button>
        </div>
      </motion.form>
    </div>
  );
}
