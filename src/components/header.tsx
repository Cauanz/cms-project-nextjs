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
import ThemeToggle from "./ThemeToggle";

const navigation1 = [
  { name: "Home", href: "/", current: false },
  { name: "Dashboard", href: "/dashboard", current: true },
  // { name: "Posts", href: "/posts", current: false },
  // { name: "Log in", href: "#", current: false },
  // { name: "Sign in", href: "#", current: false },
];

const navigation2 = [{ name: "Home", href: "/", current: false }];

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
  
  console.log(path.split(" "))

  // TODO - ADICIONAR PARA CLICAR FORA DO MENU MOBILE E FECHAR
  // TODO - AINDA TEM ALGUNS ELEMENTOS COM TEMA INCONSISTENTE

  const navigation = isSignedIn ? navigation1 : navigation2;

  return (
    <>
      <div className="h-16 z-50 fixed top-0 left-0 w-full">
        <Disclosure as="nav" className="bg-[#F1F3F6] dark:bg-[#17074D]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* LEFT */}
              <div className="flex items-center">
                <div className="shrink-0">
                  <Link href="/">
                    <Image
                      alt="Logo blog"
                      src="/logo-blog.png"
                      className="size-9"
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
                          path.split("/")[1] === item.href.split("/")[1]
                            ? "bg-[#c9c8c8] dark:bg-[#3e3d3f] text-[#111827] dark:text-[#E5E7EB]"
                            : "text-[#111827] hover:bg-[#3e3d3f] hover:text-[#dee0e2] dark:text-[#E5E7EB] dark:hover:bg-[#b3b3b3] dark:hover:text-[#111827]",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* LEFT */}

              {/* RIGHT */}
              <div className="hidden md:block">
                <div className="flex items-center gap-4 md:gap-6">
                  <button
                    type="button"
                    className="relative flex items-center justify-center rounded-full bg-[#F1F3F6] dark:bg-[#3e3d3f] p-2 text-[#111827] dark:text-[#E5E7EB] hover:bg-[#e5e7eb] dark:hover:text-[#111827] hover:text-[#17074D] dark:hover:bg-[#b3b3b3] transition-colors duration-150 cursor-pointer"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Ver notificações</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>
                  <div className="flex items-center gap-2 md:gap-3 px-2 py-1 rounded-xl bg-[#ececec] dark:bg-[#3e3d3f]">
                    <ThemeToggle />
                    <div className="relative flex items-center h-full">
                      <SignedOut>
                        <ul className="flex flex-row items-center gap-2 h-full">
                          <li>
                            <SignInButton>
                              <button className="border border-[#b3b3b3] bg-[#17074D] text-[#E5E7EB] dark:bg-[#c9c8c8] dark:text-[#111827] hover:bg-[#b3b3b3] hover:text-[#111827] dark:hover:bg-[#b3b3b3] dark:hover:text-[#17074D] rounded-lg px-4 py-1.5 cursor-pointer h-9 flex items-center text-sm font-medium shadow-sm transition-colors">
                                Log in
                              </button>
                            </SignInButton>
                          </li>
                          <li>
                            <SignUpButton>
                              <button className="border border-[#b3b3b3] bg-[#E5E7EB] text-[#17074D] dark:bg-[#232136] dark:text-[#E5E7EB] hover:bg-[#b3b3b3] hover:text-[#17074D] dark:hover:bg-[#b3b3b3] dark:hover:text-[#232136] rounded-lg px-4 py-1.5 cursor-pointer h-9 flex items-center text-sm font-medium shadow-sm transition-colors">
                                Sign Up
                              </button>
                            </SignUpButton>
                          </li>
                        </ul>
                      </SignedOut>
                      <SignedIn>
                        <ul className="flex flex-row items-center h-full">
                          <li className="flex items-center h-full dark:bg-white rounded-4xl">
                            <UserButton
                              appearance={{
                                elements: {
                                  userButtonAvatarBox:
                                    "ring-2 ring-[#17074D] dark:ring-[#E5E7EB] rounded-full",
                                },
                              }}
                            />
                          </li>
                        </ul>
                      </SignedIn>
                    </div>
                  </div>
                </div>
              </div>
              {/* RIGHT */}

              {/* MOBILE AREA */}
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden cursor-pointer">
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
                      ? "bg-[#c9c8c8] dark:bg-[#020617] text-[#111827] dark:text-[#E5E7EB]"
                      : "text-[#111827] hover:bg-gray-700 hover:text-[#dee0e2] dark:text-[#E5E7EB] dark:hover:bg-[#b3b3b3] dark:hover:text-[#aeb2b8]",
                    "block rounded-md px-3 py-2 text-base font-medium cursor-pointer",
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <SignedIn>
                <SignOutButton>
                  <button className="block w-full text-left rounded-md py-2 text-base font-medium text-[#111827] dark:text-[#E5E7EB] hover:bg-gray-700 hover:text-white cursor-pointer px-3">
                    Log out
                  </button>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button className="block w-full text-left rounded-md py-2 text-base font-medium text-[#111827] dark:text-[#E5E7EB] hover:bg-gray-700 hover:text-white cursor-pointer px-3">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="block w-full text-left rounded-md py-2 text-base font-medium text-[#111827] dark:text-[#E5E7EB] hover:bg-gray-700 hover:text-white cursor-pointer px-3">
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
                    <div className="text-base/5 font-medium text-[#111827] dark:text-[#E5E7EB]">
                      {user?.firstName}
                    </div>
                    <div className="text-sm font-medium text-[#4B5563] dark:text-[#9CA3AF]">
                      {user?.emailAddresses[0].emailAddress}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
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
