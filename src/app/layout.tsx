import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Wanderlast — Discover Your Next Adventure",
  description:
    "Your gateway to extraordinary travel experiences around the world.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${playfair.variable} ${josefinSans.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}