import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <Link href="/digital-art">Digital art</Link>
          </li>
          <li>
            <Link href="/the-game-of-life">The Game of Life</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
