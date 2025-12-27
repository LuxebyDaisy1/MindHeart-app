"use client";

import { useRouter } from "next/navigation";

export default function MoodPage() {
  const router = useRouter();

  function handleSelect(mood: string) {
    localStorage.setItem("mindheart_mood", mood);
    router.push("/onboarding/preferences");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 10 }}>
        How are you feeling right now?
      </h1>

      <p style={{ opacity: 0.7, marginBottom: 32, textAlign: "center" }}>
        Choose what fits best. You can always change this later.
      </p>

      <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 14 }}>
        <button
          onClick={() => handleSelect("overwhelmed")}
          style={buttonStyle}
        >
          I’m feeling overwhelmed
        </button>

        <button
          onClick={() => handleSelect("alone")}
          style={buttonStyle}
        >
          I feel alone
        </button>

        <button
          onClick={() => handleSelect("stuck")}
          style={buttonStyle}
        >
          I feel stuck
        </button>
      </div>
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "16px",
  fontSize: 16,
  borderRadius: 12,
  border: "1px solid rgba(15,23,42,0.15)",
  background: "white",
  cursor: "pointer",
  textAlign: "center",
};