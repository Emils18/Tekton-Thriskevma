'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👷 Hello! I’m your Tekton assistant. Ask me anything — from project costs to timelines.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const parseSuggestions = (text: string): { cleanText: string; suggestions: string[] } => {
    const marker = '---SUGGESTIONS---';
    const idx = text.indexOf(marker);
    if (idx === -1) return { cleanText: text, suggestions: [] };
    const clean = text.substring(0, idx).trim();
    const after = text.substring(idx + marker.length).trim();
    const suggestions = after
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    return { cleanText: clean, suggestions };
  };

  const sendMessage = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error('API error');
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        const { cleanText } = parseSuggestions(full);
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: cleanText };
          return copy;
        });
      }

      const { cleanText, suggestions } = parseSuggestions(full);
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'assistant', content: cleanText, suggestions };
        return copy;
      });
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fallback suggestions if AI doesn't provide them
  const defaultSuggestions = ['Tell me about services', 'Get a price estimate', 'See past projects'];

  return (
    <>
      {/* Floating button – more visible with label */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="hidden sm:inline-block bg-white/90 backdrop-blur-sm text-brand-green text-sm font-semibold px-4 py-2 rounded-pill shadow-lg border border-white/50">
          Chat with us
        </span>
        <motion.button
          onClick={() => setOpen(!open)}
          className="relative bg-brand-green text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-2 border-brand-accent/50"
          whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(76,175,80,0.6)' }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="absolute -top-1 -right-1 text-xl">👷</span>
        </motion.button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-gradient-to-b from-brand-green/95 to-brand-green/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-brand-accent/30 overflow-hidden z-50"
          >
            <div className="bg-brand-green/80 text-white px-5 py-3 font-semibold flex items-center justify-between border-b border-brand-accent/20">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
                </span>
                <span>Tekton Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">✕</button>
            </div>

            <div
              className="p-4 h-80 overflow-y-auto text-sm text-white flex flex-col gap-3 relative"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              {messages.map((msg, i) => {
                const displaySuggestions =
                  msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0
                    ? msg.suggestions
                    : msg.role === 'assistant'
                    ? defaultSuggestions
                    : [];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col"
                  >
                    <div
                      className={`rounded-2xl p-3 max-w-[85%] ${
                        msg.role === 'user'
                          ? 'bg-brand-accent/20 self-end border border-brand-accent/30'
                          : 'bg-white/10 self-start border border-white/20'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {displaySuggestions.length > 0 && (
                      <motion.div
                        className="flex flex-wrap gap-2 mt-2 self-start"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 },
                          },
                        }}
                      >
                        {displaySuggestions.map((s, idx) => (
                          <motion.button
                            key={idx}
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.05, backgroundColor: '#4CAF50', color: '#fff' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => sendMessage(s)}
                            className="px-3 py-1.5 bg-white/15 border border-brand-accent/40 text-white text-xs rounded-full hover:shadow-lg hover:border-brand-accent transition-all duration-200"
                          >
                            {s}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t border-brand-accent/20 bg-brand-green/30 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-pill px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  disabled={loading}
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={loading}
                  className="bg-brand-accent text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 shadow-lg hover:shadow-brand-accent/30 transition-shadow"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(76,175,80,0.6)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}