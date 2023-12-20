import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { FaStar } from "react-icons/fa";

import localFont from "next/font/local";
import { Poppins } from "next/font/google";

import Link from "next/link";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-between flex-col relative h-[680px] p-0 ">
      <div className="background-main"></div>
      <div
        className={cn(
          "flex items-center justify-between flex-col ",
          headingFont.className
        )}
      >
        <div className="mb-6 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Lightbulb className="h-6 w-6 mr-2" />
          It all starts with an idea
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-10 z-10 leading-4">
          <div className="flex flex-col gap-3 items-center justify-center">
            <span>Collaborative</span>
            <span>Mind Mapping</span>
          </div>
        </h1>
        <div className="bg-white p-8 rounded-full z-10 mt-4">
          <div className="text-2xl md:text-5xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-5 p-2 rounded-full pb-4 w-fit z-10">
            Mindmap Flow
          </div>
        </div>

        <Button
          className="mt-8 z-10 bg-slate-700 text-neutral-100 hover:bg-slate-600"
          size="lg"
          asChild
        >
          <Link href="/sign-up">Get Mindmap for free</Link>
        </Button>

        <div className="flex gap-1 items-center justify-center text-yellow-400 mt-4">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        <div
          className={cn(
            "flex flex-col items-center justify-center mt-2 text-neutral-400 z-10",
            textFont.className
          )}
        >
          <span>
            Trusted by <b>25 million</b>
          </span>
          <span>happy users worldwide</span>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;
