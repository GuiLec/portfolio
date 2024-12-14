import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GuiLec's Portfolio",
  description: "I drop here the things I do.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/digital-art">Digital art</Link>
            </li>
            <li>
              <Link href="/the-game-of-life">The Game of Life</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
