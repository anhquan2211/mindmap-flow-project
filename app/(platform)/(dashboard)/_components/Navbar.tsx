"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";
import { FormPopover } from "@/components/form/form-popover";
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
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center justify-between dark:bg-[#1a1625]">
      {/* Mobile Sidebar */}
      <MobileSidebar />

      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            variant="primary"
            size="sm"
            className="rounded-sm hidden md:block h-auto py-1.5 px-2 text-white dark:bg-[#5e43f3] dark:text-neutral-100"
          >
            Create
          </Button>
        </FormPopover>

        <FormPopover>
          <Button
            variant="primary"
            size="sm"
            className="rounded-sm block md:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>

      {/* <div className="">
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
      </div> */}

      <div className="ml-auto flex items-center gap-x-2">
        <ModeToggle />
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px",
                borderRadius: "6px",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
