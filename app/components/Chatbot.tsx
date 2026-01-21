'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Panel, Button } from './ui';
import { PORTFOLIO_CONTEXT } from '@/app/data/portfolioContext';

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
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversation history from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('chatbotHistory');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setMessages(parsed);
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Failed to load conversation history:', e);
          }
        }
      }
    }
  }, []);

  // Save conversation history to sessionStorage whenever messages change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      sessionStorage.setItem('chatbotHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      sessionStorage.removeItem('chatbotHistory');
    }
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Validate message length (500 characters max)
    if (trimmedInput.length > 500) {
      setError('Message too long. Maximum 500 characters.');
      return;
    }

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
          context: PORTFOLIO_CONTEXT,
          history: messages.slice(-6).map((msg) => ({
            content: msg.content,
            isUser: msg.role === 'user',
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Request failed');
      }

      const assistantMessage: Message = {
        content: data.response || 'No response received',
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
      {!isOpen && (
        <motion.button
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:right-8 z-50 bg-primary text-background px-4 py-3 font-mono text-xs uppercase tracking-wider border-2 border-primary hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg min-h-[44px]"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
          aria-expanded={false}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          CHAT
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[420px] md:w-[480px] h-[calc(100vh-8rem)] sm:h-[600px] max-h-[600px] shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Panel
              variant="bordered"
              headerVariant="accent"
              title="CHAT"
              className="h-full flex flex-col overflow-hidden [&>div:last-child]:!p-0 [&>div:last-child]:!h-full [&>div:last-child]:!flex [&>div:last-child]:!flex-col"
            >
              <div className="w-full h-full flex flex-col min-h-0 p-4 box-border">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-current/20 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        isLoading ? 'bg-primary animate-pulse' : messages.length === 0 ? 'bg-muted' : 'bg-success'
                      }`}
                    />
                    <span className="text-xs font-mono uppercase tracking-wider text-secondary">
                      {isLoading
                        ? 'PROCESSING...'
                        : messages.length === 0
                        ? 'Ready to chat'
                        : `${messages.length} message${messages.length !== 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-xs"
                    aria-label="Close chat panel"
                  >
                    ✕
                  </Button>
                </div>

                {/* Messages Container */}
                <div
                  ref={messagesContainerRef}
                  className="flex-1 min-h-0 overflow-y-scroll space-y-4 px-2 py-4 chatbot-messages"
                  style={{
                    scrollbarWidth: 'auto',
                    scrollbarColor: 'rgba(0, 0, 0, 0.3) transparent',
                    overflowY: 'scroll',
                    WebkitOverflowScrolling: 'touch',
                    height: '100%',
                    maxHeight: '100%',
                  }}
                >
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-sm font-mono text-muted/80 uppercase tracking-wider">
                        Ask a question to get started
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex flex-col gap-1 ${
                          msg.role === 'user' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`font-mono text-sm border-2 rounded-sm px-3 py-2 max-w-[85%] ${
                            msg.role === 'user'
                              ? 'bg-primary text-background border-text/80'
                              : msg.role === 'error'
                              ? 'bg-warning/20 text-warning border-warning/70'
                              : 'bg-muted/60 text-text border-text/40'
                          }`}
                        >
                          <div className="font-bold uppercase tracking-wider mb-1 text-[10px] opacity-80">
                            {msg.role === 'user' ? 'YOU' : msg.role === 'error' ? 'ERROR' : 'ASSISTANT'}
                          </div>
                          <div className="leading-relaxed whitespace-pre-wrap break-words">{msg.content}</div>
                        </div>
                        <div className={`text-[9px] font-mono uppercase tracking-wider opacity-40 px-1 ${
                          msg.role === 'user' ? 'text-right' : 'text-left'
                        }`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs font-mono text-muted px-3 py-2 bg-muted/30 border-2 border-text/20 rounded-sm">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="uppercase tracking-wider">Processing...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mb-2 px-2 py-1 bg-warning/20 border border-warning/50 text-warning text-xs font-mono uppercase flex-shrink-0">
                    {error}
                  </div>
                )}

                {/* Clear Button */}
                <div className="flex justify-end mb-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="text-xs"
                    disabled={messages.length === 0}
                  >
                    CLEAR
                  </Button>
                </div>

                {/* Input Container */}
                <div className="flex gap-2 pt-3 border-t-2 border-current/20 flex-shrink-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 500) {
                        setInput(value);
                        setError(null);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about experience, skills, or projects..."
                    disabled={isLoading}
                    autoComplete="off"
                    maxLength={500}
                    className="flex-1 px-3 py-2.5 bg-background border-2 border-current/30 font-mono text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm min-h-[44px]"
                    aria-label="Message input"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="text-xs whitespace-nowrap px-4 min-h-[44px]"
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
