"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface RotatingFlowerProps {
  className?: string;
  speedMultiplier?: number;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function RotatingFlower({
  className = "w-40 h-40",
  speedMultiplier = 1,
  src = "/steel-flower.webp",
  alt = "3D chrome metallic flower logo",
  width = 512,
  height = 512
}: RotatingFlowerProps) {
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;

    const handleScroll = () => {
      if (!isVisible) return;

      const scrollY = window.scrollY;
      // Convert scroll position to rotation (adjust multiplier for desired speed)
      const newRotation = (scrollY * speedMultiplier) % 360;
      setRotation(newRotation);
    };

    const updateRotation = () => {
      handleScroll();
      animationFrame = requestAnimationFrame(updateRotation);
    };

    // Set initial visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          // Start animation when visible
          animationFrame = requestAnimationFrame(updateRotation);
        } else {
          // Stop animation when not visible
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [speedMultiplier, isVisible]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotate: `${rotation}deg`,
        transformOrigin: 'center center'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        opacity: { duration: 0.6 },
        scale: { duration: 0.6, ease: "easeOut" }
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-contain select-none pointer-events-none"
        priority
      />
    </motion.div>
  );
}