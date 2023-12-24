"use client";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: String) => {
    return path === pathname
      ? "p-2 lg:px-4 md:mx-2 text-indigo-500 rounded dark:text-sky-400"
      : "p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:text-indigo-600 transition-colors duration-300 dark:text-gray-300";
  };

  return (
    <div className="fixed top-0 w-full h-14 px-4 shadow-sm bg-white flex items-center dark:bg-gray-900 z-50">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="ml-26">
          <Link href="/about" className={isActive("/about")}>
            About
          </Link>
          <Link href="/contact" className={isActive("/contact")}>
            Contact
          </Link>
          <Link href="/feature" className={isActive("/feature")}>
            Feature
          </Link>
          <Link href="/price" className={isActive("/price")}>
            Price
          </Link>
        </div>
        <div className="space-x-4 md:w-auto flex items-center justify-between w-full">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="bg-slate-700 text-white hover:bg-slate-600 dark:bg-[#2f2b3a]"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-slate-700 text-white hover:bg-slate-600 dark:bg-[#2f2b3a]"
          >
            <Link href="/sign-up">Get Mindmap for free</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
