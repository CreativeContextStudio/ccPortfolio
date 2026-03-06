'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_CONTEXT } from '@/app/data/portfolio-context';

interface Message {
  content: string;
  role: 'user' | 'assistant' | 'error';
  timestamp: number;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('chatbotHistory');
      if (stored) { try { setMessages(JSON.parse(stored)); } catch {} }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0)
      sessionStorage.setItem('chatbotHistory', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    if (typeof window !== 'undefined') sessionStorage.removeItem('chatbotHistory');
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    if (trimmed.length > 500) { setError('Message too long. Maximum 500 characters.'); return; }

    setMessages((prev) => [...prev, { content: trimmed, role: 'user', timestamp: Date.now() }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          context: PORTFOLIO_CONTEXT,
          history: messages.slice(-6).map((m) => ({ content: m.content, isUser: m.role === 'user' })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Request failed');
      setMessages((prev) => [...prev, { content: data.response || 'No response received', role: 'assistant', timestamp: Date.now() }]);
    } catch (err) {
      setMessages((prev) => [...prev, { content: err instanceof Error ? err.message : 'Communication failure', role: 'error', timestamp: Date.now() }]);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  return (
    <>
      {!isOpen && (
        <motion.button
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-ltx-studio text-white px-5 py-3 rounded-full text-sm font-semibold shadow-lg hover:brightness-110 transition min-h-[44px]"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          Ask Creative Context
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:w-[420px] h-[calc(100dvh-8rem)] sm:h-[540px] max-h-[540px] bg-background rounded-2xl shadow-2xl border border-ltx-rule flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ltx-rule">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-ltx-studio animate-pulse' : 'bg-green-500'}`} />
                <span className="text-sm font-semibold text-ltx-black">Portfolio Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearHistory} disabled={messages.length === 0} className="text-xs text-ltx-muted hover:text-ltx-black disabled:opacity-30 transition-colors">Clear</button>
                <button onClick={() => setIsOpen(false)} className="w-7 h-7 rounded-full hover:bg-ltx-alt flex items-center justify-center text-ltx-muted hover:text-ltx-black transition" aria-label="Close chat">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" /></svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.length === 0 ? (
                <div className="py-8 space-y-4">
                  <p className="text-sm text-ltx-muted text-center">Ask about experience, skills, or projects</p>
                  <div className="flex flex-col gap-2">
                    {["What kind of projects does James produce?", "Tell me about the AI and agentic work", "What's James's production background?"].map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => { setInput(prompt); }}
                        className="text-left text-xs px-3 py-2.5 rounded-xl border border-ltx-rule hover:border-ltx-studio hover:text-ltx-studio text-ltx-muted transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user' ? 'bg-ltx-studio text-white rounded-br-md' :
                      msg.role === 'error' ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-md' :
                      'bg-ltx-alt text-ltx-black rounded-bl-md'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-ltx-alt rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-ltx-muted flex items-center gap-2">
                    <svg width="60" height="20" viewBox="0 0 60 20" className="text-ltx-studio">
                      <path
                        d="M0,10 Q5,10 7.5,3 T15,10 T22.5,10 T30,10 Q35,10 37.5,17 T45,10 T52.5,10 T60,10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      >
                        <animate attributeName="d" dur="1.2s" repeatCount="indefinite" values="M0,10 Q5,10 7.5,3 T15,10 T22.5,10 T30,10 Q35,10 37.5,17 T45,10 T52.5,10 T60,10;M0,10 Q5,10 7.5,17 T15,10 T22.5,10 T30,10 Q35,10 37.5,3 T45,10 T52.5,10 T60,10;M0,10 Q5,10 7.5,3 T15,10 T22.5,10 T30,10 Q35,10 37.5,17 T45,10 T52.5,10 T60,10" />
                      </path>
                    </svg>
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {error && <div className="px-5 py-2 text-xs text-red-500 bg-red-50 border-t border-red-100">{error}</div>}

            {/* Input */}
            <div className="flex gap-2 px-5 py-4 border-t border-ltx-rule">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => { if (e.target.value.length <= 500) { setInput(e.target.value); setError(null); } }}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Ask about experience, skills, projects..."
                disabled={isLoading}
                maxLength={500}
                className="flex-1 px-4 py-2.5 rounded-xl border border-ltx-rule bg-ltx-alt/50 text-sm focus:outline-none focus:border-ltx-studio focus:ring-2 focus:ring-ltx-studio/20 transition disabled:opacity-50 min-h-[44px]"
                aria-label="Message input"
                autoComplete="off"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2.5 rounded-xl bg-ltx-studio text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
