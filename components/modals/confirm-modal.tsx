"use client";

import { auth } from "@clerk/nextjs";
import { deleteBoard } from "@/actions/delete-board";

import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";

import { useState } from "react";
import { toast } from "sonner";
import Modal from "./delete-modal";

import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { Button } from "../ui/button";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
  id: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, id }) => {
  const router = useRouter();

  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: () => {
      toast.success("Deleted Mindmap Successfully!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
    if (!isLoading) {
      setTimeout(() => {
        onClose();
        toast.success("Deleted Mindmap Successfully!");
      }, 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Mindmap
          </Dialog.Title>

          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this mindmap? This action cannot
              be undone.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-x-2">
        <Button variant="danger" disabled={isLoading} onClick={onDelete}>
          Delete
        </Button>
        <Button variant="secondary" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
