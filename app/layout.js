import "./globals.css";
import Navbar from "./components/Navbar";
import BackgroundAudio from "./components/BackgroundAudio";

export const metadata = {
  title: "Pokémon Dashboard",
  description: "Educational demo for Web Programming - Interactive Pokémon Explorer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-100" suppressHydrationWarning>
        <BackgroundAudio />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

