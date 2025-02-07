import "./globals.css";

export const metadata = {
  title: "KhanaKhajana",
  description: "Keep your restro life easy",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}