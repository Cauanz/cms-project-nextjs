import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  return (
    // <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 hidden sm:block">

      <aside
        id="default-sidebar"
        className="fixed top-16 left-0 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-[#17074D]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/dashboard">
                <span
                  className={`flex items-center p-2 rounded-lg text-[#111827] hover:bg-[#3e3d3f] hover:text-[#dee0e2] dark:text-[#E5E7EB] dark:hover:bg-[#b3b3b3] dark:hover:text-[#111827] ${
                    pathname === "/dashboard" &&
                    "text-[#111827] bg-[#c9c8c8] dark:text-[#E5E7EB] dark:bg-[#3e3d3f]"
                  }  dark:hover:bg-[#3e3d3f] group`}
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#dee0e2] dark:group-hover:text-[#111827]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Your Dashboard</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/posts">
                <span
                  className={`flex items-center p-2 rounded-lg text-[#111827] hover:bg-[#3e3d3f] hover:text-[#dee0e2] dark:text-[#E5E7EB] dark:hover:bg-[#b3b3b3] dark:hover:text-[#111827] 
                    ${pathname === "/dashboard/posts" && "text-[#111827] bg-[#c9c8c8] dark:text-[#E5E7EB] dark:bg-[#3e3d3f]"}  dark:hover:bg-[#3e3d3f] group`}
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#dee0e2] dark:group-hover:text-[#111827]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Posts</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/newPost">
                <span
                  className={`flex items-center p-2 rounded-lg text-[#111827] hover:bg-[#3e3d3f] hover:text-[#dee0e2] dark:text-[#E5E7EB] dark:hover:bg-[#b3b3b3] dark:hover:text-[#111827] ${
                    pathname === "/dashboard/newPost" &&
                    "text-[#111827] bg-[#c9c8c8] dark:text-[#E5E7EB] dark:bg-[#3e3d3f]"
                  }  dark:hover:bg-[#3e3d3f] group`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-[#dee0e2] dark:group-hover:text-[#111827]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">
                    New Post
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    // </div>
  );
}
