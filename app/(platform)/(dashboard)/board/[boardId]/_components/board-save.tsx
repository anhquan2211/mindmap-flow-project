"use client";

import { useState } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

import LoadingButton from "@/components/loading-button";
import { Hint } from "@/components/hint";
import { HelpCircle } from "lucide-react";

interface BoardSaveProps {
  autoSaveEnabled: boolean;
  toggleAutoSave: () => void;
}

export default function BoardSave({
  autoSaveEnabled,
  toggleAutoSave,
}: BoardSaveProps) {
  return (
    <div className="mt-1 z-50 absolute top-[70px] right-[200px]">
      <label className="relative inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={autoSaveEnabled}
          onChange={toggleAutoSave}
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-2 text-sm font-medium text-gray-100 dark:text-gray-300 ">
          Auto Save
        </span>
      </label>
      <Hint
        sideOffset={20}
        description={`
        If you enable auto-save, your mindmap will be saved every 15 seconds.
            `}
        side="bottom"
      >
        <HelpCircle className="absolute bottom-2 right-0 h-[14px] w-[14px] text-gray-100" />
      </Hint>
    </div>
  );
}
