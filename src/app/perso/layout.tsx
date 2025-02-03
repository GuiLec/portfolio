import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GuiLec's Portfolio",
  description: "I drop here the things I do.",
};

export default function LayoutPerso({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/perso/digital-art">Digital art</Link>
          </li>
          <li>
            <Link href="/perso/the-game-of-life">The Game of Life</Link>
          </li>
          <li>
            <Link href="/athle">Athle</Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}
