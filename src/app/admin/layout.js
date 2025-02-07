// src/app/admin/layout.js
"use client";
import { AdminProvider } from "../context/AdminContext";
import Sidebar from "../../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </AdminProvider>
  );
}
