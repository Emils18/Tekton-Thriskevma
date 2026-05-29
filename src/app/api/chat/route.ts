import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const systemMessage = {
      role: 'system' as const,
      content: `You are a friendly assistant for Tekton Thriskevma Corp., a premium construction company in Mandaue City, Philippines.
Services: Residential, Commercial, Industrial, Design-Build, Project Management, Renovation.
Mission: "Build with purpose – high‑quality, visually inspiring, environmentally responsible."

When responding:
- Answer the user's question clearly and warmly.
- Always end your reply with exactly 3 relevant follow‑up suggestions that the user can click, formatted as:
---SUGGESTIONS---
Suggestion 1
Suggestion 2
Suggestion 3
- Keep the suggestions short and clickable (like "Get a price estimate", "See our projects", etc.).
- Do not include any other text after the SUGGESTIONS block.`,
    };

    // Use the currently supported Llama 3 8B model (free on Groq)
   const response = await groq.chat.completions.create({
  model: 'llama-3.1-8b-instant',  // active free model on Groq
  messages: [systemMessage, ...messages],
  stream: true,
  max_tokens: 500,
});

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(encoder.encode(content));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}