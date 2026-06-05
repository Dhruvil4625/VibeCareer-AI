"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  MessageSquare,
  Send,
  Loader2,
  Sparkles,
  Plus,
  Bot,
  User,
  Cpu,
  Trash2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { generateId } from "@/lib/utils";
import type { ChatMessage } from "@/types";

const STARTER_PROMPTS = [
  "Craft a 90-day plan to transition to Product Manager",
  "Review my skills and identify career gaps",
  "Negotiate a higher salary after receiving a job offer",
  "What are the best strategies to get interviews at FAANG?",
  "Write a 30-second elevator pitch for my career story",
];

export default function CoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `👋 **Welcome to your personal AI Career Coach!**

I'm powered by Gemini AI and I'm here to help you accelerate your career. Ask me anything, or try selecting a topic:

- 📄 **Resume & Cover Letter** strategy
- 🎯 **Job search** and networking techniques  
- 🎤 **Interview preparation** and mock Q&A
- 💰 **Salary negotiation** tactics
- 🗺️ **Career roadmaps** and skill development`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const conversationMessages = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to get response");
        return;
      }

      setMessages((prev) => [...prev, data.message as ChatMessage]);
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Starting a new coaching session! What career challenge can I help you with today?",
        timestamp: new Date().toISOString(),
      },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 h-[calc(100vh-100px)] px-2">
      {/* 1. Hero-Level Subpage Header */}
      <div
        className="rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-[var(--border-default)] shadow-[var(--shadow-sm)]"
        style={{
          background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
        }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-500">
            <Bot className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-wider">AI Career Copilot</span>
          </div>
          <h1
            className="text-xl md:text-2xl font-black"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            AI Career Coach
          </h1>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Powered by Gemini Pro · Real-time customized career strategy reports.
          </p>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-default)] px-3 py-1.5 rounded-xl shadow-[var(--shadow-sm)]">
            <Cpu className="w-3.5 h-3.5 text-pink-500" />
            <div className="text-[9px]">
              <p className="font-bold text-[var(--text-primary)]">Gemini Engine</p>
              <p className="text-[var(--text-muted)]">Active</p>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:bg-[var(--bg-muted)] transition-all text-xs font-semibold hover:-translate-y-0.5 active:translate-y-0 shadow-[var(--shadow-sm)] cursor-pointer"
            style={{ color: "var(--text-primary)" }}
          >
            <Plus className="w-3.5 h-3.5" />
            New Chat
          </button>
        </div>
      </div>

      {/* 2. Glass Chat Container */}
      <div
        className="card flex flex-col flex-1 overflow-hidden border border-[var(--border-default)] shadow-[var(--shadow-elevated)]"
        style={{ background: "var(--bg-card)", backdropFilter: "blur(8px)" }}
      >
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3.5 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className="relative">
                {message.role === "assistant" && isLoading && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-pink-500 opacity-30 z-0"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  />
                )}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-[var(--shadow-sm)]"
                  style={{
                    background:
                      message.role === "assistant"
                        ? "linear-gradient(135deg, #ec4899, #8b5cf6)"
                        : "linear-gradient(135deg, #7c3aed, #5b21b6)",
                  }}
                >
                  {message.role === "assistant" ? (
                    <Bot className="w-4.5 h-4.5 text-white" />
                  ) : (
                    <User className="w-4.5 h-4.5 text-white" />
                  )}
                </div>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[78%] rounded-2xl px-5 py-4 text-xs leading-relaxed shadow-[var(--shadow-soft)] ${
                  message.role === "user" ? "rounded-tr-none" : "rounded-tl-none border-l-4"
                }`}
                style={
                  message.role === "user"
                    ? {
                        background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                        color: "#ffffff",
                      }
                    : {
                        background: "var(--bg-subtle)",
                        borderTop: "1px solid var(--border-default)",
                        borderRight: "1px solid var(--border-default)",
                        borderBottom: "1px solid var(--border-default)",
                        borderLeftColor: "#ec4899",
                        color: "var(--text-primary)",
                      }
                }
              >
                {message.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none text-xs leading-relaxed" style={{ color: "var(--text-primary)" }}>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </motion.div>
          ))}

          {/* AI Loader Bubble */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3.5"
            >
              <div className="relative w-9 h-9">
                <motion.div
                  className="absolute inset-0 rounded-full bg-pink-500 opacity-30 z-0"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-[var(--shadow-sm)]"
                  style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                >
                  <Bot className="w-4.5 h-4.5 text-white" />
                </div>
              </div>
              <div
                className="px-5 py-4 rounded-2xl rounded-tl-none border border-[var(--border-default)] border-l-4 border-l-pink-500 flex items-center gap-2.5 shadow-[var(--shadow-soft)]"
                style={{ background: "var(--bg-subtle)" }}
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-500" />
                <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                  Analyzing career path...
                </span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 3. Starter Prompt Capsules (Shown on welcome state) */}
        {messages.length === 1 && (
          <div className="px-6 pb-5 pt-2 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3 text-[var(--text-muted)]">
              Ask Career Coach:
            </p>
            <div className="flex flex-wrap gap-2">
              {STARTER_PROMPTS.map((prompt) => (
                <motion.button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  whileHover={{ y: -1.5, borderColor: "var(--brand-primary)", background: "var(--bg-card)" }}
                  whileTap={{ scale: 0.98 }}
                  className="text-xs px-3.5 py-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-subtle)] text-left shadow-[var(--shadow-sm)] transition-colors cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area Form */}
        <div className="p-4 border-t border-[var(--border-default)] bg-[var(--bg-card)]">
          <div
            className="flex items-end gap-3 rounded-xl p-2.5 transition-all focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500"
            style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)" }}
          >
            <Sparkles className="w-5 h-5 flex-shrink-0 mb-2.5 text-pink-500" />
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your career challenge... (Shift+Enter for new line)"
              rows={1}
              className="flex-1 bg-transparent text-xs leading-relaxed outline-none resize-none py-1.5"
              style={{ color: "var(--text-primary)", maxHeight: "120px" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 cursor-pointer"
              style={{
                background:
                  input.trim() && !isLoading
                    ? "linear-gradient(135deg, #ec4899, #8b5cf6)"
                    : "var(--bg-muted)",
              }}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
          <p className="text-[9px] text-center mt-2.5" style={{ color: "var(--text-muted)" }}>
            Gemini AI can make mistakes. Consider double-checking important details before final choices.
          </p>
        </div>
      </div>
    </div>
  );
}
