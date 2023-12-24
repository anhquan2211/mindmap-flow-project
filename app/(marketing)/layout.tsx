"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
    >
      <div className="h-full bg-slate-100">
        {/* Navbar */}
        <Navbar />

        <main className="pb-20 bg-slate-100 h-full">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </ClerkProvider>
  );
};

export default MarketingLayout;
