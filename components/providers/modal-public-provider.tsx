"use client";

import { useEffect, useState } from "react";

import { PublicModal } from "@/components/modals/public-modal";

export const ModalPublicProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PublicModal />
    </>
  );
};
