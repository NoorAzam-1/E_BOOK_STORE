import Header from "@/components/Header";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "e-book-store",
  description: "Modern e-book store UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${manrope.variable} bg-background text-on-surface`}
      >
        <Header />
        <main className="pt-18 sm:py-19 md:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}