import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {ThemeProvider} from "@/contexts/ThemeContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Metadata artık dinamik olarak çalışmıyor, statik olarak tanımlanmalı
export const metadata: Metadata = {
    title: "Aday Değerlendirmesi",
    description: "Aday Değerlendirmesi",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>

            <LanguageProvider>
                <Header />
                {children}
            </LanguageProvider>
        </ThemeProvider>

        </body>
        </html>
    );
}