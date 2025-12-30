"use client";

import { useRouter } from "next/navigation";

const CHECK_INS = [
  { label: "I’m not okay", mood: "overwhelmed" },
  { label: "I feel lonely", mood: "alone" },
  { label: "I feel stuck", mood: "stuck" },
  { label: "I’m okay, just checking in", mood: "neutral" },
];

export default function CheckInPage() {
  const router = useRouter();

  function handleCheckIn(mood: string) {
    try {
      localStorage.setItem("mindheart_mood", mood);
    } catch {
      // ignore if storage is blocked
    }

    // Always go to the same chat route
    router.push("/chat");

    // Fallback in case the router ever fails silently
    setTimeout(() => {
      if (typeof window !== "undefined" && window.location.pathname !== "/chat") {
        window.location.href = "/chat";
      }
    }, 50);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>
          How are you feeling right now?
        </h1>
        <p style={{ opacity: 0.7, marginBottom: 28 }}>
          There’s no right answer. Just pick what feels closest.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CHECK_INS.map((item) => (
            <button
              key={item.mood}
              type="button"
              onClick={() => handleCheckIn(item.mood)}
              style={{
                padding: "16px",
                borderRadius: 14,
                background: "#1e293b",
                color: "#f9fafb",
                border: "1px solid rgba(148,163,184,0.25)",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}