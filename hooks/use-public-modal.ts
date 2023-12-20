import { create } from "zustand";

type PublicModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const usePublicModal = create<PublicModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
