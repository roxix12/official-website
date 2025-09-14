// Lightweight Gemini client wrapper for frontend usage
// IMPORTANT: Exposes API key to browser; prefer a server proxy for production.

const DEFAULT_MODEL = 'gemini-1.5-flash';

export function getApiKey() {
  // Prefer injected runtime var, then Vite env. We no longer read user storage.
  const runtimeKey = typeof window !== 'undefined' ? window.__env?.VITE_GEMINI_API_KEY : undefined;
  if (runtimeKey) return runtimeKey;
  const envKey = import.meta?.env?.VITE_GEMINI_API_KEY;
  if (envKey) return envKey;
  return null;
}

function buildContents(messages, userInput) {
  const contents = [];
  const all = [...(messages || []), userInput ? { role: 'user', content: userInput } : null].filter(Boolean);
  all.forEach((m) => {
    contents.push({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] });
  });
  return contents;
}

export async function geminiGenerate({ messages = [], userInput = '', model = DEFAULT_MODEL, systemPrompt }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Missing API key. Add VITE_GEMINI_API_KEY in .env.local or paste your key in the chat page settings.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const contents = buildContents(messages, userInput);

  const body = {
    contents,
    // system instruction provides persona of Cdw Burhan and focus areas
    systemInstruction: systemPrompt
      ? { role: 'system', parts: [{ text: systemPrompt }] }
      : undefined,
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
    generationConfig: {
      temperature: 0.6,
      topP: 0.9,
      maxOutputTokens: 1024,
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n') ?? '';
  return text;
}


