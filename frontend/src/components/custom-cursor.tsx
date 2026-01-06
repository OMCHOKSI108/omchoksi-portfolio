"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch device
    const checkMobile = () => {
      setIsMobile(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      setPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const hoverText = target.getAttribute("data-hover-text");
      if (hoverText) {
        setIsHovered(true);
        setHoverText(hoverText);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setHoverText("");
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Add hover listeners to elements with data-hover-text
    const hoverElements = document.querySelectorAll("[data-hover-text]");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Hide cursor on mobile devices
  if (isMobile) return null;

  return (
    <div
      className={`custom-cursor ${isHovered ? "hovered" : ""} ${
        hoverText ? "project-hover" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
      }}
      data-text={hoverText}
    />
  );
}