"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          {process.env.NEXT_PUBLIC_APP_NAME || "VeriField"}
        </Link>
        <nav>
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
}
