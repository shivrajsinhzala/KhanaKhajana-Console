// src/app/login/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://khanakhajana-f7r6.onrender.com/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Decorative */}
      {/* <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="md:w-1/2 bg-gradient-to-br from-[#5091E5] to-[#6BB1FF] p-12 flex flex-col justify-center items-center text-white"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">KhanaKhajana</h1>
        <p className="text-xl md:text-2xl text-center mb-8">Admin Console</p>
        <div className="w-64 h-64 relative">
          
          
          <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse">
          

          
          </div>
        </div>
      </motion.div> */}

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="md:w-1/2 bg-gradient-to-br from-[#5091E5] to-[#6BB1FF] p-12 flex flex-col justify-center items-center text-white"
      >
        <div className="relative w-64 h-64 mb-8">
          <Image
            src="/logo.png" // Make sure to add your logo.png to the public folder
            alt="KhanaKhajana Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">KhanaKhajana</h1>
        <p className="text-xl md:text-2xl text-center">Admin Console</p>
      </motion.div>
      
      {/* Right Panel - Login Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="md:w-1/2 flex items-center justify-center p-12 bg-white"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5091E5] focus:border-transparent transition-all"
                  placeholder="admin@example.com"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5091E5] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-white bg-[#5091E5] hover:bg-[#6BB1FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5091E5] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
