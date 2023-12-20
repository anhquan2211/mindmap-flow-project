"use client";

import { useEffect, useState } from "react";

import { PrivateModal } from "@/components/modals/private-modal";

export const ModalPrivateProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PrivateModal />
    </>
  );
};
