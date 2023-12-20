"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
    >
      <Toaster position="top-center" richColors />
      <ModalProvider />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
