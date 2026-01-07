'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Panel, Button } from './ui';

// Development-only logger for client-side
const isDev = process.env.NODE_ENV === 'development';
const clientLogger = {
  error: (...args: unknown[]) => {
    if (isDev) {
      console.error(...args);
    }
  },
};

interface Message {
  content: string;
  role: 'user' | 'assistant' | 'error';
  timestamp: number;
}

export default function AgentQueryInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversation history from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('agentQueryHistory');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setMessages(parsed);
        } catch (e) {
          clientLogger.error('Failed to load conversation history:', e);
        }
      }
    }
  }, []);

  // Save conversation history to sessionStorage whenever messages change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      sessionStorage.setItem('agentQueryHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear conversation history
  const clearHistory = useCallback(() => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('agentQueryHistory');
    }
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      content: trimmedInput,
      role: 'user',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedInput,
          history: messages.map(({ content, role }) => ({ content, role })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Request failed');
      }

      const assistantMessage: Message = {
        content: data.message,
        role: 'assistant',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        content:
          err instanceof Error
            ? `ERROR: ${err.message}`
            : 'ERROR: Communication failure. Please try again.',
        role: 'error',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button - Fixed Position */}
      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-primary text-background px-4 py-3 sm:px-6 font-mono text-xs uppercase tracking-wider border-2 border-primary hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg min-h-[44px] min-w-[80px]"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close agent query interface' : 'Open agent query interface'}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? 'CLOSE' : 'CHAT'}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-4 sm:bottom-24 sm:right-6 sm:left-auto sm:top-auto z-40 w-[calc(100%-2rem)] sm:w-full sm:max-w-md"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Panel
              variant="bordered"
              headerVariant="accent"
              title="CHAT"
              className="h-[calc(100vh-8rem)] sm:h-[600px] flex flex-col"
            >
              <div id="chat-panel" role="region" aria-label="Chat interface">
              {/* Status Indicator */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-current/10">
                <div className="flex items-center gap-2">
                  <motion.div
                    className={`w-2 h-2 rounded-full ${
                      isLoading ? 'bg-primary' : messages.length === 0 ? 'bg-muted' : 'bg-success'
                    }`}
                    animate={{
                      opacity: isLoading ? [1, 0.5, 1] : 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: isLoading ? Infinity : 0,
                    }}
                  />
                  <span className="text-xs font-mono uppercase tracking-wider text-secondary">
                    {isLoading ? 'PROCESSING...' : messages.length === 0 ? 'just need to clink this clank over here...' : 'just need to clink this clank over here...'}
                  </span>
                </div>
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="text-xs"
                  >
                    CLEAR LOG
                  </Button>
                )}
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                {messages.length === 0 ? (
                  <div className="text-center py-12 text-sm font-mono text-muted uppercase tracking-wider">
                    Ask a question to get started
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`flex flex-col gap-1 ${
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className={`inline-block max-w-[85%] px-3 py-2 rounded font-mono text-xs ${
                          msg.role === 'user'
                            ? 'bg-primary text-background'
                            : msg.role === 'error'
                            ? 'bg-warning/20 text-warning border border-warning/50'
                            : 'bg-muted/30 text-text border border-current/10'
                        }`}
                      >
                        <div className="font-semibold uppercase tracking-wider mb-1 text-[10px] opacity-70">
                          {msg.role === 'user' ? 'YOU' : msg.role === 'error' ? 'ERROR' : 'ASSISTANT'}
                        </div>
                        <div className="leading-relaxed whitespace-pre-wrap break-words">
                          {msg.content}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                {isLoading && (
                  <motion.div
                    className="flex items-center gap-2 text-xs font-mono text-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Processing...
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-2 px-2 py-1 bg-warning/20 border border-warning/50 text-warning text-xs font-mono uppercase">
                  {error}
                </div>
              )}

              {/* Input Container */}
              <div className="flex gap-2 pt-2 border-t border-current/10">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Coming Soon..."
                    disabled={true}
                    autoComplete="off"
                    className="w-full px-3 py-2 bg-background border-2 border-current/20 font-mono text-xs focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Message input (Coming Soon)"
                  />
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={sendMessage}
                  disabled={true}
                  className="text-xs whitespace-nowrap"
                >
                  SEND
                </Button>
              </div>
              </div>
            </Panel>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

