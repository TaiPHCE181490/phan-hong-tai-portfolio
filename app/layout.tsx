import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phan Hong Tai | Developer Portfolio",
  description:
    "Portfolio of Phan Hong Tai, a Node.js and .NET developer focused on RESTful APIs, databases, authentication, payment integration, and full-stack projects.",
  openGraph: {
    title: "Phan Hong Tai | Developer Portfolio",
    description:
      "Portfolio of Phan Hong Tai, a Node.js and .NET developer focused on RESTful APIs, databases, authentication, payment integration, and full-stack projects.",
    type: "website",
    locale: "en_US",
    siteName: "Phan Hong Tai Portfolio",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-900">
        {children}
      </body>
    </html>
  );
}
