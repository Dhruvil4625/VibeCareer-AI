"use client";

import { useEffect } from "react";

export function MouseSpotlightTracker() {
  useEffect(() => {
    const updateMouseCoords = (e: MouseEvent) => {
      // Set relative to viewport coordinates
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
      
      // Set absolute page coordinates
      document.documentElement.style.setProperty("--mouse-page-x", `${e.pageX}px`);
      document.documentElement.style.setProperty("--mouse-page-y", `${e.pageY}px`);
    };

    window.addEventListener("mousemove", updateMouseCoords);
    return () => {
      window.removeEventListener("mousemove", updateMouseCoords);
    };
  }, []);

  return null;
}
