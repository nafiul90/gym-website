"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RegistrationModal from "./RegistrationModal";

// ─── Context ──────────────────────────────────────────────────────────────────

const RegistrationContext = createContext(null);

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("useRegistration must be used within RegistrationProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export default function RegistrationProvider({ children, gymData, termsContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  // Auto-open when ?registration=true is present in the URL
  useEffect(() => {
    if (searchParams.get("registration") === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <RegistrationContext.Provider value={{ isOpen, openModal, closeModal, gymData, termsContent }}>
      {children}
      <RegistrationModal />
    </RegistrationContext.Provider>
  );
}
