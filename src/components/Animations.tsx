"use client";

import { useEffect } from "react";
import { initAnimations } from "@/lib/gsap-animations";

export function Animations() {
  useEffect(() => initAnimations(document.body), []);
  return null;
}
