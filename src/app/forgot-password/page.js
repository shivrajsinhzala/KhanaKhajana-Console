// app/forgot-password/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "https://khanakhajana-f7r6.onrender.com/admin/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          data.msg || "Password reset instructions sent to your email."
        );
      } else {
        setError(data.msg || "Failed to send reset instructions.");
      }
    } catch (error) {
      console.error("Error during forgot password:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#5091E5] to-[#6BB1FF]">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="p-8 border rounded-2xl shadow-2xl bg-white transform transition-all duration-300 w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#5091E5] to-[#6BB1FF] bg-clip-text text-transparent">
          Forgot Password
        </h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {message && (
          <div className="text-green-500 text-sm mb-4">{message}</div>
        )}
        <motion.div whileFocus={{ scale: 1.05 }} className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-200 p-3 w-full rounded-lg focus:outline-none focus:border-[#5091E5] transition-all text-black"
            required
          />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-[#5091E5] text-white px-6 py-3 rounded-lg w-full font-semibold shadow-lg hover:shadow-[#5091E5]/50 transition-all"
        >
          Reset Password
        </motion.button>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-sm text-[#5091E5] hover:underline"
          >
            Back to Login
          </button>
        </div>
      </motion.form>
    </div>
  );
}
