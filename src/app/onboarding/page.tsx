"use client";

import { useRouter } from "next/navigation";

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#0f172a", // DARK, readable, locked
          marginBottom: "12px",
        }}
      >
        Welcome to MindHeart
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#334155", // NOT faded
          marginBottom: "32px",
        }}
      >
        Your emotional companion starts now.
      </p>

      <button
        onClick={() => router.push("/onboarding/mood")}
        style={{
          padding: "14px 28px",
          fontSize: "16px",
          fontWeight: 600,
          borderRadius: "10px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Continue
      </button>
    </div>
  );
}