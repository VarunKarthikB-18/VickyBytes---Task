"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiSmile } from "react-icons/fi";

interface Message {
  id: string;
  user: string;
  text: string;
  color?: string;
  isCurrentUser?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  { id: "msg-1", user: "CyberNinja", text: "Let's gooooo! 🔥", color: "text-blue-400" },
  { id: "msg-2", user: "TechGuru21", text: "Been waiting for this stream all week.", color: "text-green-400" },
  { id: "msg-3", user: "PixelPanda", text: "Audio sounds great today", color: "text-pink-400" },
  { id: "msg-4", user: "StreamWatcher", text: "Is there a delay?", color: "text-purple-400" },
  { id: "msg-5", user: "GamerXYZ", text: "Hype!! 🚀🚀🚀", color: "text-yellow-400" },
];

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      user: "You",
      text: inputValue.trim(),
      color: "text-primary",
      isCurrentUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-[500px] lg:h-full w-full rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4 bg-muted/50">
        <h3 className="font-semibold text-card-foreground">Live Chat</h3>
        <span className="flex h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm break-words"
              >
                <span className={`font-semibold mr-2 ${msg.color}`}>{msg.user}:</span>
                <span className="text-muted-foreground">{msg.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-muted/30">
        <form onSubmit={handleSendMessage} className="flex gap-2 relative">
          <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <FiSmile className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 rounded-full bg-secondary border border-border px-10 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <FiSend className="h-4 w-4 mr-0.5 mt-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
