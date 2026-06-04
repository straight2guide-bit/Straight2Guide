"use client";

import { motion } from "framer-motion";

interface Props {
  top: string;
  left: string;
  label: string;
}

export function DestinationMarker({ top, left, label }: Props) {
  return (
    <div
      className="absolute"
      style={{ top, left, transform: "translate(-50%, -50%)" }}
      title={label}
    >
      <div className="relative flex items-center justify-center">
        <motion.span
          className="absolute rounded-full bg-[#F28C28]"
          style={{ width: 20, height: 20 }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 2.8 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <div className="relative z-10 h-3 w-3 rounded-full bg-[#F28C28] shadow ring-2 ring-white" />
      </div>
    </div>
  );
}
