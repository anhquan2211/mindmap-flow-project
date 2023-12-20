"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { usePublicModal } from "@/hooks/use-public-modal";
import { useRouter } from "next/navigation";
import { usePrivateModal } from "@/hooks/use-private-modal";
import { OrganizationProfile } from "@clerk/nextjs";

import { MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const publicModal = usePublicModal();
  const privateModal = usePrivateModal();
  const router = useRouter();

  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  const onClick = () => {
    publicModal.onOpen();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-2 flex gap-x-2"
          variant="transparent"
        >
          Mindmap Actions
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4 dark:text-neutral-100">
          Mindmap Actions
        </div>

        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="ghost"
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          onClick={onClick}
        >
          <MdOutlinePublic className="mr-2 w-4 h-4" />
          Share Public
        </Button>

        <Button
          variant="ghost"
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          onClick={() => {
            console.log("private");

            privateModal.onOpen();
          }}
        >
          <RiGitRepositoryPrivateFill className="mr-2 w-4 h-4" />
          Share Private
        </Button>

        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          <MdDelete className="mr-2 w-4 h-4" />
          Delete this Mindmap
        </Button>
      </PopoverContent>
    </Popover>
  );
};
