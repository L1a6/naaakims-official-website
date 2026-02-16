import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NAAKIMS Worldwide | National Association of Akwa Ibom State Medical Students",
  description: "Official website of NAAKIMS Worldwide - connecting medical students from Akwa Ibom State across continents. Preserving our legacy, empowering our future.",
  keywords: ["NAAKIMS", "Akwa Ibom", "medical students", "Nigeria", "healthcare", "student association"],
  openGraph: {
    title: "NAAKIMS Worldwide",
    description: "Connecting medical students from Akwa Ibom State across continents",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
