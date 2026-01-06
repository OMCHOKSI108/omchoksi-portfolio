"use client";

import FloatingThemeToggle from "./floating-theme-toggle";
import { usePathname } from "next/navigation";

export default function FloatingThemeToggleWrapper() {
  const pathname = usePathname();

  // Hide the floating theme toggle on the Links page
  if (pathname === "/links") return null;

  return <FloatingThemeToggle />;
}
