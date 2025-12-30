"use client";

import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  function handleStartCheckIn() {
    localStorage.setItem("mindheart_seen_welcome", "true");
    router.push("/check-in");
  }

  function handleSkipToChat() {
    localStorage.setItem("mindheart_seen_welcome", "true");
    router.push("/chat");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 560, width: "100%" }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>
          Welcome to MindHeart
        </h1>
        <p style={{ opacity: 0.7, marginBottom: 28 }}>
          Pick your vibe. We’ll meet you there.
        </p>

        <div
          style={{
            background: "#1e293b",
            borderRadius: 16,
            padding: 20,
            marginBottom: 12,
            border: "1px solid rgba(148,163,184,0.25)",
          }}
        >
          <strong>A calmer space</strong>
          <p style={{ opacity: 0.8, marginTop: 6 }}>
            No pressure. No judgment. Just a place to exhale and get back to
            yourself.
          </p>
        </div>

        <div
          style={{
            background: "#1e293b",
            borderRadius: 16,
            padding: 20,
            marginBottom: 12,
            border: "1px solid rgba(148,163,184,0.25)",
          }}
        >
          <strong>Quick check-ins</strong>
          <p style={{ opacity: 0.8, marginTop: 6 }}>
            Pick a mood and we’ll start there. Small steps count.
          </p>
        </div>

        <div
          style={{
            background: "#1e293b",
            borderRadius: 16,
            padding: 20,
            marginBottom: 28,
            border: "1px solid rgba(148,163,184,0.25)",
          }}
        >
          <strong>Tiny tools that help</strong>
          <p style={{ opacity: 0.8, marginTop: 6 }}>
            Breathing, grounding, and gentle prompts — only when you want them.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handleStartCheckIn}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: 12,
              background: "#334155",
              color: "#f9fafb",
              border: "none",
              cursor: "pointer",
            }}
          >
            Start check-in
          </button>

          <button
            onClick={handleSkipToChat}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: 12,
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Skip to chat
          </button>
        </div>

        <p style={{ opacity: 0.6, marginTop: 14, fontSize: 14 }}>
          You can change your mood anytime.
        </p>
      </div>
    </main>
  );
}