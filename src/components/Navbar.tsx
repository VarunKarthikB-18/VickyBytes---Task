"use client";

import Link from "next/link";
import { FiSearch, FiBell, FiUser } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-[1600px] mx-auto gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-bold text-lg">V</span>
          </div>
          <span className="hidden md:inline-block font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
            VickyBytes
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center max-w-xl mx-auto">
          <motion.div 
            animate={{ scale: isFocused ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex items-center w-full max-w-md rounded-full bg-secondary border transition-colors ${
              isFocused ? "border-primary" : "border-border"
            } px-4 py-2`}
          >
            <FiSearch className="text-muted-foreground mr-2 h-4 w-4" />
            <input
              type="text"
              placeholder="Search events, streams, or categories..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </motion.div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors border border-border">
            <FiUser className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
