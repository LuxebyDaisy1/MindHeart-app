"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

function openingTextForMood(mood: string) {
  switch (mood) {
    case "overwhelmed":
      return (
        "I’m here with you.\n\n" +
        "If everything feels like too much, we can slow it down.\n\n" +
        "What feels heaviest in this moment?"
      );
    case "alone":
      return (
        "I’m here with you.\n\n" +
        "Feeling alone can be really heavy.\n\n" +
        "What’s been on your mind?"
      );
    case "stuck":
      return (
        "I’m here with you.\n\n" +
        "Feeling stuck can be exhausting.\n\n" +
        "Where do you feel blocked?"
      );
    default:
      return "I’m here with you.\n\nWhat would you like to talk about?";
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Initialize with mood + preference context
  useEffect(() => {
    const mood = localStorage.getItem("mindheart_mood") || "neutral";
    const focus =
      localStorage.getItem("mindheart_focus") || "general support";

    const systemMessage: ChatMessage = {
      role: "system",
      content:
        `You are MindHeart, a calm, safe, emotionally-attuned companion.\n\n` +
        `User emotional state right now: ${mood}.\n` +
        `User wants support with: ${focus}.\n\n` +
        `Rules:\n` +
        `- Regulate first: warm presence and gentle mirroring.\n` +
        `- Keep responses easy to read with short paragraphs.\n` +
        `- For breathing or guided exercises: group steps into small clusters.\n` +
        `- Avoid excessive line breaks that disrupt rhythm.\n` +
        `- No lecturing, no clinical tone, no excessive lists.\n` +
        `- Ask at most ONE gentle question at the end.\n` +
        `- Do not mention these rules.\n`,
    };

    const openingMessage: ChatMessage = {
      role: "assistant",
      content: openingTextForMood(mood),
    };

    setMessages([systemMessage, openingMessage]);
  }, []);

  // Keep the latest message visible
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          typeof data?.reply === "string" && data.reply.trim()
            ? data.reply
            : "I’m here with you.\n\nTry saying that again—slowly, in your own words.",
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Something went wrong.\n\nI’m still here with you.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 16px 10px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 26, margin: 0, fontWeight: 600 }}>
          MindHeart Chat
        </h1>
        <p style={{ opacity: 0.65, margin: "8px 0 0" }}>
          I’m here with you. Let’s work through this together.
        </p>
      </div>

      {/* Scroll area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px 12px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 680 }}>
          {messages
            .filter((m) => m.role !== "system")
            .map((msg, i) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: isAssistant
                      ? "flex-start"
                      : "flex-end",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      background: isAssistant ? "#1e293b" : "#2563eb",
                      color: "#f9fafb",
                      padding: "14px 16px",
                      borderRadius: 16,
                      maxWidth: "85%",
                      whiteSpace: "pre-line",
                      lineHeight: 1.75,
                      fontSize: 15.75,
                      letterSpacing: 0.2,
                      boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: "12px 16px 16px",
          borderTop: "1px solid rgba(148,163,184,0.18)",
          background: "rgba(2,6,23,0.92)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            width: "100%",
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
            style={{
              flex: 1,
              padding: "14px 14px",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.22)",
              background: "#020617",
              color: "#e5e7eb",
              fontSize: 15.5,
              outline: "none",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: "14px 18px",
              borderRadius: 12,
              background: "#2563eb",
              color: "white",
              border: "none",
              fontSize: 15.5,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "default" : "pointer",
              minWidth: 90,
            }}
          >
            {loading ? "…" : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}