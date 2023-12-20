"use client";

import { usePublicModal } from "@/hooks/use-public-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import { MdPublic } from "react-icons/md";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useOrigin } from "@/hooks/use-origin";
import { usePathname } from "next/navigation";

export const PublicModal = () => {
  const pathname = usePathname();

  const [copied, setCopied] = useState(false);

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

  return (
    <Dialog open={publicModal.isOpen} onOpenChange={publicModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="relative flex items-center justify-center mt-4">
          <MdPublic className="h-10 w-10 text-blue-600" />
        </div>

        <div className="text-neutral-700 mx-auto space-y-2">
          <h2 className="font-semibold text-xl">Public this Mindmap!</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Share your Mindmap with others.
          </p>
        </div>

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
      </DialogContent>
    </Dialog>
  );
};
