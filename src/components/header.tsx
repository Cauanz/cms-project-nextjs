"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full h-17 bg-amber-600 flex items-center justify-between p-3.5">
      <ul className="w-40 list-none flex flex-row justify-evenly">
        <SignedOut>
          <li>
            <SignInButton />
          </li>
          <li>
            <SignUpButton />
          </li>
        </SignedOut>
        <SignedIn>
          <li>
            <UserButton />
          </li>
        </SignedIn>
      </ul>

      <div className="imageContent flex w-32 h-16">
      <Image
        src="https://picsum.photos/20/30"
        alt="placeholder"
        width="300"
        height="200"
        />
        </div>
    </div>
  );
}
