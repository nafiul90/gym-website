"use client";

import { useRegistration } from "./RegistrationProvider";

export default function JoinButton({ className, children }) {
  const { openModal } = useRegistration();

  return (
    <button type="button" className={className} onClick={openModal}>
      {children}
    </button>
  );
}
