import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Pokémon Dashboard",
  description: "Educational demo for Web Programming - Interactive Pokémon Explorer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-100 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

