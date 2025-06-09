"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation1 = [
  { name: "Main Page", href: "/", current: false },
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Posts", href: "/posts", current: false },
  // { name: "Log in", href: "#", current: false },
  // { name: "Sign in", href: "#", current: false },
];

const navigation2 = [
  { name: "Main Page", href: "/", current: false }
];

// const userNavigation = [
//   { name: "Your Profile", href: "#" },
//   { name: "Settings", href: "#" },
//   { name: "Sign out", href: "#" },
// ];

function classNames(...classes: number[] | string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  const navigation = isSignedIn ? navigation1 : navigation2;

  return (
    <>
      <div className="h-16 z-50 fixed top-0 left-0 w-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <Link href="/">
                    <Image
                      alt="Your Company"
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                      className="size-8"
                      width={200}
                      height={200}
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={path === item.href ? "page" : undefined}
                        className={classNames(
                          path === item.href
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>
                  <div className="relative ml-3">
                    <SignedOut>
                      <ul className="w-40 list-none flex flex-row justify-evenly">
                        <li>
                          <SignInButton>
                            <button className="border-2 border-gray-600 bg-gray-600 hover:bg-gray-400 rounded-lg p-1.5 cursor-pointer">
                              Sign In
                            </button>
                          </SignInButton>
                        </li>
                        <li>
                          <SignUpButton>
                            <button className="border-2 border-gray-600 bg-gray-600 hover:bg-gray-400 rounded-lg p-1.5 cursor-pointer">
                              Sign Up
                            </button>
                          </SignUpButton>
                        </li>
                      </ul>
                    </SignedOut>
                    <SignedIn>
                      <ul className="w-2.5 list-none flex flex-row justify-evenly">
                        <li>
                          <UserButton />
                        </li>
                      </ul>
                    </SignedIn>
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* MOBILE AREA */}
          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={path === item.href ? "page" : undefined}
                  className={classNames(
                    path === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <SignedIn>
                <SignOutButton>
                  <button className="text-gray-300 cursor-pointer px-3">
                    Log out
                  </button>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button className="text-gray-300 cursor-pointer px-3 block">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="text-gray-300 cursor-pointer py-2 px-3 block">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              {isSignedIn && (
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <Image
                      alt="userImage"
                      width={200}
                      height={200}
                      src={user?.imageUrl || ""}
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base/5 font-medium text-white">
                      {user?.firstName}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user?.emailAddresses[0].emailAddress}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              )}

              {/* <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div> */}
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </>
  );
}

//* OLD HEADER
// <div className="w-full h-17 bg-amber-400 flex items-center justify-between p-3.5">
//   <SignedOut>
//     <ul className="w-40 list-none flex flex-row justify-evenly">
//       <li>
//         <SignInButton>
//           <button className="border-2 border-gray-600 bg-gray-600 hover:bg-gray-400 rounded-lg p-1.5 cursor-pointer">
//             Sign In
//           </button>
//         </SignInButton>
//       </li>
//       <li>
//         <SignUpButton>
//           <button className="border-2 border-gray-600 bg-gray-600 hover:bg-gray-400 rounded-lg p-1.5 cursor-pointer">
//             Sign Up
//           </button>
//         </SignUpButton>
//       </li>
//     </ul>
//   </SignedOut>
//   <SignedIn>
//     <ul className="w-2.5 list-none flex flex-row justify-evenly">
//       <li>
//         <UserButton />
//       </li>
//     </ul>
//   </SignedIn>

//   <div className="imageContent flex w-32 h-16">
//     <Image
//       src="https://picsum.photos/20/30"
//       alt="placeholder"
//       width="300"
//       height="200"
//     />
//   </div>
// </div>
