import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
  openGraph: {
    images:
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Elements_of_the_culture_mindmap.png",
    description:
      "Powerful & Easy To Use — Your Ideas Deserve A Beautiful Online Mind Map Canvas. Start For Free. Upgrade Anytime. ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
