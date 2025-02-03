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
            <strong>Perso</strong>
            <ul>
              <li>
                <Link href="/perso">Perso</Link>
              </li>
              <li>
                <Link href="/perso/digital-art">Digital art</Link>
              </li>
              <li>
                <Link href="/perso/the-game-of-life">The Game of Life</Link>
              </li>
            </ul>
          </li>
          <li></li>
          <li>
            <strong>Public</strong>
            <ul>
              <Link href="/athle">Athle</Link>
            </ul>
          </li>
          <li></li>
        </ul>
      </nav>
      {children}
    </>
  );
}
