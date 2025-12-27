"use client";

import { useRouter } from "next/navigation";

export default function ReadyPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-semibold mb-4">
        You’re all set.
      </h1>

      <p className="text-gray-600 mb-8 max-w-md">
        MindHeart is here to support you, at your pace.
        <br />
        We can start whenever you’re ready.
      </p>

      <button
        onClick={() => router.push("/chat")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg"
      >
        Start my first conversation
      </button>
    </main>
  );
}