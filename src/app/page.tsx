"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { mockEvents, categories } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = activeCategory === "All" 
    ? mockEvents 
    : mockEvents.filter(event => event.category === activeCategory);

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8">
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Discover <span className="text-primary">Live Events</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Watch the latest streams, from esports tournaments to 24/7 lofi radio.
          </motion.p>
        </div>
      </div>

      {/* Filter Options */}
      <div className="mb-8 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex items-center gap-3">
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Event Grid */}
      {filteredEvents.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <EventCard event={event} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-xl">
          <p className="text-xl font-semibold mb-2">No events found in this category.</p>
          <p className="text-muted-foreground">Try selecting a different category from above.</p>
        </div>
      )}
    </div>
  );
}
