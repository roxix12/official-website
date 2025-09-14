import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../../components/ui/Header';
import ScrollProgressBar from '../../components/ui/ScrollProgressBar';
import Icon from '../../components/AppIcon';
import { geminiGenerate, getApiKey } from '../../services/geminiClient';
import Footer from '../../components/ui/Footer';
import { Link } from 'react-router-dom';

const systemPersona = `
You are the official AI assistant for Cdw Burhan.

About Cdw Burhan (use this as ground truth when asked about him):
- Full‑stack developer and "Digital Alchemist" specializing in Shopify, WordPress & React.
- Focus areas: ecommerce performance, custom themes & apps, modern React UI, and clean UX.
- Trusted by 100+ clients. Provides free, practical tutorials and problem‑solving guides.

Voice & style: professional, friendly, concise, solutions‑first. Prefer bullets, short sections, and copy‑pasteable code. When code is long, summarize first, then provide the snippet.

Rules:
- If a user asks "Who is Cdw Burhan?" or similar, answer directly using the profile above. Do not say you don't know him.
- Keep answers skimmable with headings and bullets. Use clear step lists for fixes.
- When appropriate, suggest relevant tutorial ideas the user could follow on the blog.
`;

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatMarkdown(text) {
  try {
    let t = text;

    // Code blocks
    t = t.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const label = (lang || 'code').toLowerCase();
      const raw = encodeURIComponent(code);
      return `
<div class="code-block relative group mt-3 mb-4 rounded-xl border border-border bg-black/60">
  <div class="flex items-center justify-between px-3 py-2 text-[11px] uppercase tracking-wide text-muted-foreground/90 border-b border-border rounded-t-xl bg-black/40">
    <span>${label}</span>
    <button class="copy-btn px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-foreground transition-all duration-200" data-code="${raw}">Copy</button>
  </div>
  <pre class="p-3 overflow-x-auto rounded-b-xl"><code>${escapeHtml(code)}</code></pre>
</div>`;
    });

    // Headings - support #, ##, ### and ordered list headings for clearer structure
    t = t.replace(/^\s*###\s+(.+)$/gm, '<h5 class="mt-4 mb-2 font-semibold text-white">$1</h5>');
    t = t.replace(/^\s*##\s+(.+)$/gm, '<h4 class="mt-5 mb-2 font-semibold text-white">$1</h4>');
    t = t.replace(/^\s*#\s+(.+)$/gm, '<h3 class="mt-6 mb-3 font-bold text-white">$1</h3>');
    t = t.replace(/^\s*\d+\.\s+(.+)$/gm, '<h4 class="mt-4 mb-2 font-semibold text-white">$1</h4>');

    // Bold
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Bullets - keep simple \n• text
    t = t.replace(/\n[-*]\s/g, '\n• ');
    t = t.replace(/\n\n/g, '<br/><br/>' );
    return t;
  } catch {
    return text;
  }
}

function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  const ref = useRef(null);

  useEffect(() => {
    if (isUser) return;
    const root = ref.current;
    if (!root) return;
    const handler = async (e) => {
      const btn = e.target.closest('.copy-btn');
      if (!btn) return;
      try {
        const raw = decodeURIComponent(btn.getAttribute('data-code') || '');
        await navigator.clipboard.writeText(raw);
        const old = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('bg-accent','text-black');
        setTimeout(() => {
          btn.textContent = old || 'Copy';
          btn.classList.remove('bg-accent','text-black');
        }, 1400);
      } catch {}
    };
    root.addEventListener('click', handler);
    return () => root.removeEventListener('click', handler);
  }, [isUser, content]);
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 border ${
          isUser
            ? 'bg-accent text-black border-accent/30'
            : 'bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 text-foreground border-accent/20 shadow-neon'
        }`}
        ref={ref}
      >
        {!isUser ? (
          <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
        ) : (
          content
        )}
      </div>
    </div>
  );
}

// Thread management helpers
const STORAGE_KEY = 'cbw_chat_threads_v1';
const createThread = () => ({ id: `${Date.now()}`, title: 'New chat', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), messages: [] });
const loadThreads = () => {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
};
const saveThreads = (t) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(t)); } catch {} };

const QuickTopics = ({ onPick }) => {
  const topics = [
    { label: 'Fix CLS on Shopify theme', prompt: 'How do I reduce Cumulative Layout Shift on a Shopify Dawn theme?' },
    { label: 'WooCommerce checkout speed', prompt: 'Steps to speed up WooCommerce checkout with caching and async scripts' },
    { label: 'React image optimization', prompt: 'How to lazy-load images in React with IntersectionObserver and fallbacks?' },
    { label: 'Liquid dynamic sections', prompt: 'Liquid snippet to render dynamic sections with schema and presets' },
  ];
  return (
    <div className="flex gap-2 flex-wrap">
      {topics.map((t) => (
        <button key={t.label} className="px-3 py-2 rounded-lg bg-muted/30 text-sm hover:bg-muted/50" onClick={() => onPick(t.prompt)}>
          {t.label}
        </button>
      ))}
    </div>
  );
};

const ChatAssistantPage = () => {
  const [threads, setThreads] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasKey, setHasKey] = useState(!!getApiKey());
  const listRef = useRef(null);

  // Load chats
  useEffect(() => {
    const loaded = loadThreads();
    if (loaded.length === 0) {
      const t = createThread();
      const list = [t];
      setThreads(list); setActiveId(t.id); setMessages([]); saveThreads(list);
    } else {
      setThreads(loaded); setActiveId(loaded[0].id); setMessages(loaded[0].messages || []);
    }
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const persist = (next) => { setThreads(next); saveThreads(next); };
  const newChat = () => { const t = createThread(); persist([t, ...threads]); setActiveId(t.id); setMessages([]); };
  const openChat = (id) => { const t = threads.find(x => x.id === id); if (!t) return; setActiveId(id); setMessages(t.messages || []); };
  const deleteChat = (id) => { const filtered = threads.filter(t => t.id !== id); persist(filtered); if (id === activeId) { if (filtered.length) { setActiveId(filtered[0].id); setMessages(filtered[0].messages || []); } else { newChat(); } } };

  const handleSend = async (text) => {
    const userText = (text ?? input).trim();
    if (!userText) return;
    const next = [...messages, { role: 'user', content: userText }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const reply = await geminiGenerate({ messages: next, systemPrompt: systemPersona });
      const finalMsgs = [...next, { role: 'assistant', content: reply || 'No response' }];
      setMessages(finalMsgs);
      const title = (threads.find(t => t.id === activeId)?.title === 'New chat' && userText) ? userText.slice(0, 48) : threads.find(t => t.id === activeId)?.title;
      const updated = threads.map(t => t.id === activeId ? { ...t, title, messages: finalMsgs, updatedAt: new Date().toISOString() } : t);
      persist(updated);
    } catch (e) {
      const errMsgs = [...next, { role: 'assistant', content: `Error: ${e.message}` }];
      setMessages(errMsgs);
      const updated = threads.map(t => t.id === activeId ? { ...t, messages: errMsgs, updatedAt: new Date().toISOString() } : t);
      persist(updated);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ScrollProgressBar offsetTopPx={64} />
      <main className="pt-24">
        <section className="px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-accent/10 rounded-full mb-3">
                  <Icon name="Bot" size={14} className="text-accent" />
                  <span className="text-accent text-sm font-medium">Cdw Burhan Assistant</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold">Ask me about Shopify, WordPress, and React</h1>
                <p className="text-muted-foreground max-w-2xl mt-1 text-sm md:text-base">Get step-by-step help, links to tutorials, and copy‑ready code snippets.</p>
              </div>
              <button className="lg:hidden px-3 py-2 rounded-lg bg-white/10 border border-white/20" onClick={newChat}>
                <Icon name="Plus" size={16} className="mr-1 inline" /> New
              </button>
            </div>

            <div className="grid lg:grid-cols-[18rem_1fr] gap-4">
              {/* Sidebar: recent chats */}
              <div className="hidden lg:block bg-card border border-border rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="font-semibold">Recent Chats</div>
                  <button className="px-2 py-1 rounded hover:bg-white/10" onClick={newChat}><Icon name="Plus" size={16} /></button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2">
                  {threads?.length === 0 && <div className="text-xs text-muted-foreground px-2 py-6">No previous chats</div>}
                  {threads?.map(t => (
                    <div key={t.id} className={`rounded-lg border ${t.id === activeId ? 'border-accent bg-accent/10' : 'border-white/10 hover:bg-white/5'}`}>
                      <button onClick={() => openChat(t.id)} className="w-full text-left px-3 py-2">
                        <div className="text-sm line-clamp-1">{t.title}</div>
                        <div className="text-[11px] text-muted-foreground">{new Date(t.updatedAt).toLocaleString()}</div>
                      </button>
                      <div className="flex justify-end px-2 pb-2">
                        <button onClick={() => deleteChat(t.id)} className="text-[11px] text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-400/10">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat panel */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
              {/* API key bar removed; using a shared key via env */}
              {/* Message list */}
              <div ref={listRef} className="h-[54vh] overflow-y-auto p-4 space-y-2">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-10">
                    Start by asking a question or try a quick topic below.
                  </div>
                )}
                {messages.map((m, i) => (
                  <MessageBubble key={i} role={m.role} content={m.content} />
                ))}
                {loading && (
                  <div className="text-sm text-muted-foreground px-2">Thinking...</div>
                )}
              </div>

              {/* Composer */}
              <div className="border-t border-border p-3">
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything… e.g. How do I optimize Shopify Dawn for speed?"
                    className="flex-1 rounded-lg bg-input border border-border px-3 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button onClick={() => handleSend()} className="px-5 py-3 rounded-lg bg-accent text-black font-semibold hover:opacity-90">
                    Send
                  </button>
                  <button onClick={newChat} className="hidden md:inline px-3 py-3 rounded-lg border border-white/20 hover:bg-white/10">
                    <Icon name="Plus" size={16} className="mr-1 inline" /> New
                  </button>
                </div>
                <div className="mt-3">
                  <QuickTopics onPick={handleSend} />
                </div>
              </div>
            </div>
            {/* end grid */}
            </div>

            {/* helper tip removed per request */}

            {/* close grid before footer tip */}
            
            <div className="text-center mt-6">
              <Link to="/portfolio-impact-transformation-stories" className="text-accent hover:underline">Explore tutorials and case studies</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="minimal" />
    </div>
  );
};

export default ChatAssistantPage;


