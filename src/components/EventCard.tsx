"use client";

import { Event } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiHeart, FiShare2, FiPlay, FiCalendar, FiClock, FiUsers } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-colors duration-300"
    >
      {/* Thumbnail Container */}
      <Link href={`/event/${event.id}`} className="relative aspect-video w-full overflow-hidden block cursor-pointer">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            unoptimized
            className="object-cover"
          />
        </motion.div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
          <div className="flex gap-2">
            {event.date === "Live Now" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-2 py-1 text-xs font-medium text-white">
                Upcoming
              </span>
            )}
            <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-2 py-1 text-xs font-medium text-white shadow-sm border border-white/10">
              {event.category}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-1 text-xs font-medium text-white border border-white/10">
            <FiUsers className="h-3 w-3" />
            {event.viewers > 1000 ? `${(event.viewers / 1000).toFixed(1)}k` : event.viewers}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <FiPlay className="h-5 w-5 ml-1" />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/event/${event.id}`} className="mb-2 line-clamp-2 text-lg font-bold text-card-foreground group-hover:text-primary transition-colors duration-200">
          {event.title}
        </Link>
        
        <div className="mb-4 flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FiCalendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
        </div>

        {/* Actions Toolbar */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                isLiked ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
              aria-label="Like Event"
            >
              <FiHeart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                // Simulation of Share
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
              aria-label="Share Event"
            >
              <FiShare2 className="h-4 w-4" />
            </button>
          </div>
          <Link
            href={`/event/${event.id}`}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Event
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
