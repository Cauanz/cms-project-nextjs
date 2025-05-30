"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="w-full h-17 bg-amber-600 flex items-center">
      <ul className="list-none">
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
    </div>
  );
}

//TODO - MUDAR ISSO DEPOIS, MELHORAR ESTILO
