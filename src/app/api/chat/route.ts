import { NextResponse } from "next/server";
import { systemPrompt } from "@/lib/systemPrompt";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body?.messages ?? [];

    if (!Array.isArray(messages)) {
      throw new Error("Invalid messages payload");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.filter(
          (m) =>
            m &&
            typeof m === "object" &&
            typeof m.role === "string" &&
            typeof m.content === "string"
        ),
      ],
      temperature: 0.6,
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "I’m here with you. Let’s take this slowly.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        reply:
          "I’m here with you.\n\nSomething didn’t come through properly. You can say that again whenever you’re ready.",
      },
      { status: 200 }
    );
  }
}