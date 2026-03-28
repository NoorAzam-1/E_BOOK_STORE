import Header from "@/components/Header";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import Footer from "@/components/Footer";
import { Providers } from "./provider";

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
        <Providers>
          <Header />
          <main className="mt-18 sm:mt-19 md:mt-20 lg:mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
