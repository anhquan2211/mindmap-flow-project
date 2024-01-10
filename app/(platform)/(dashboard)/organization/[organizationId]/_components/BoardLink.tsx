"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface BoardLinkProps {
  id: string;
  imageFullUrl: string;
  title: string;
}

export default function BoardLink({ id, imageFullUrl, title }: BoardLinkProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleBoardClick = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await router.push(`/board/${id}`);
      } catch (error) {
        console.error("Error navigating to board:", error);
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };
  return (
    <div
      onClick={handleBoardClick}
      style={{ backgroundImage: `url(${imageFullUrl})` }}
      className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
      <div className="flex">
        {isLoading ? (
          <span className="mr-2">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </span>
        ) : (
          ""
        )}
        <p className="relative font-semibold text-white">{title}</p>
      </div>
    </div>
  );
}
