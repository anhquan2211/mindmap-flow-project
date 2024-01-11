"use client";

import { usePublicModal } from "@/hooks/use-public-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import { MdPublic } from "react-icons/md";
import { AlertTriangle, Check, Copy } from "lucide-react";
import { useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { usePathname } from "next/navigation";

export const PublicModal = () => {
  const pathname = usePathname();

  const [copied, setCopied] = useState(false);
  const [published, setPublished] = useState(false);

  const publicModal = usePublicModal();

  const origin = useOrigin();

  // console.log("origin: ", origin);

  const url = `${origin}${pathname}`;
  // const url = `http://localhost:3000`;

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handlePublished = () => {
    setPublished(true);
  };

  const handleUnPublished = () => {
    setPublished(false);
  };

  return (
    <Dialog open={publicModal.isOpen} onOpenChange={publicModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden py-5">
        <div className="relative flex items-center justify-center mt-4">
          <MdPublic className="h-10 w-10 text-blue-600 dark:text-neutral-200" />
        </div>

        <div className="text-neutral-700 mx-auto space-y-2 text-center">
          <h2 className="font-semibold text-xl dark:text-neutral-100">
            Public this Mindmap!
          </h2>
          <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-100">
            Share your Mindmap with others.
          </p>
        </div>

        {published ? (
          <>
            <div className="flex items-center mb-4 max-w-md mx-5">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              variant="primary"
              className="mx-5 dark:text-neutral-100 mb-3"
              onClick={handleUnPublished}
            >
              UnPublished
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            className="mx-5 dark:text-neutral-100 mb-3"
            onClick={handlePublished}
          >
            Published
          </Button>
        )}
        <div className="text-neutral-700 mx-auto text-center">
          <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            <span>
              This feature is being developed, please try again later.
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
