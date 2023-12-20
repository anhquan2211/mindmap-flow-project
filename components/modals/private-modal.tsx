import { usePublicModal } from "@/hooks/use-public-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { usePrivateModal } from "@/hooks/use-private-modal";
import { OrganizationProfile } from "@clerk/nextjs";

export const PrivateModal = () => {
  const privateModal = usePrivateModal();

  return (
    <Dialog open={privateModal.isOpen} onOpenChange={privateModal.onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <div className="relative flex items-center justify-center mt-4">
          <RiGitRepositoryPrivateLine className="h-10 w-10 text-blue-600 dark:text-neutral-100" />
        </div>

        <div className="text-neutral-700 mx-auto space-y-2 text-center">
          <h2 className="font-semibold text-xl dark:text-neutral-100">
            Private this Mindmap!
          </h2>
          <p className="text-xs font-semibold text-neutral-600 mb-4 dark:text-neutral-100">
            Share your Mindmap with private.
          </p>

          <div className="w-full">
            <OrganizationProfile
              appearance={{
                elements: {
                  rootBox: {
                    boxShadow: "none",
                    width: "100%",
                  },
                  card: {
                    border: "1px solid #e5e5e5",
                    boxShadow: "none",
                    width: "100%",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="flex items-center mb-4 max-w-md mx-5"></div>
      </DialogContent>
    </Dialog>
  );
};
