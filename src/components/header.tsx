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
  { name: "Home", href: "/", current: false },
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Posts", href: "/posts", current: false },
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

  // TODO - AINDA NÃO ENTENDI NEM O QUE FAZER, NEM COMO FUNCIONA PARA SETAR O TEMA DARK/LIGHT
  // TODO - PAREI AQUI, REMOVI O SIDEBAR POR SER POINTLESS
  // TODO - REFATORAR COMPONENTE DE ALERTA, TALVEZ USAR O SHADCN

  // TODO - ADICIONAR PARA CLICAR FORA DO MENU MOBILE E FECHAR
  // const { theme, setTheme } = useTheme();
  // const [isLight, setIsLight] = useState(false);

  // const toggleTheme = () => {
  //   if (isLight) {
  //   }
  // };

  const navigation = isSignedIn ? navigation1 : navigation2;

  return (
    <>
      <div className="h-16 z-50 fixed top-0 left-0 w-full">
        <Disclosure as="nav" className="bg-[#F1F3F6] dark:bg-[#020617]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <Link href="/">
                    <Image
                      alt="Logo blog"
                      src="/logo-blog.png"
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
                            ? "bg-[#c9c8c8] dark:bg-[#020617] text-[#111827] dark:text-[#E5E7EB]"
                            : "text-[#111827] hover:bg-gray-700 hover:text-[#dee0e2] dark:text-[#E5E7EB] dark:hover:bg-[#b3b3b3] dark:hover:text-[#aeb2b8]",
                          "rounded-md px-3 py-2 text-sm font-medium",
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
                    className="relative rounded-full bg-[#F1F3F6] p-1 text-[#111827] hover:bg-gray-700 hover:text-[#dee0e2] focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden cursor-pointer"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>
                  {/* <button
                    type="button"
                    className="ml-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                    aria-label="Toggle theme"
                    // onClick={() => toggleTheme()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button> */}
                  <div className="relative ml-3 flex items-center h-full">
                    <SignedOut>
                      <ul className="flex flex-row items-center gap-2 h-full">
                        <li className="flex items-center h-full">
                          <SignInButton>
                            <button className="border-2 border-gray-600 bg-gray-600 hover:bg-gray-400 rounded-lg p-1.5 cursor-pointer h-9 flex items-center">
                              Sign In
                            </button>
                          </SignInButton>
                        </li>
                        <li className="flex items-center h-full">
                          <SignUpButton>
                            <button className="border-2 border-gray-600 bg-gray-600 hover:bg-gray-400 rounded-lg p-1.5 cursor-pointer h-9 flex items-center">
                              Sign Up
                            </button>
                          </SignUpButton>
                        </li>
                      </ul>
                    </SignedOut>
                    <SignedIn>
                      <ul className="flex flex-row items-center h-full">
                        <li className="flex items-center h-full">
                          <UserButton />
                        </li>
                      </ul>
                    </SignedIn>
                  </div>
                </div>
              </div>

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
