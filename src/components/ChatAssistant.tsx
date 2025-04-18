"use client";

import { useState } from 'react';
import styles from './ChatAssistant.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dementiaMode, setDementiaMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          dementiaMode 
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles.chatBubble} ${isOpen ? styles.hidden : ''}`} onClick={() => setIsOpen(true)}>
        🤖
      </div>
      
      <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
        <div className={styles.chatHeader}>
          <h3>File Converter Assistant</h3>
          <div className={styles.headerControls}>
            <label className={styles.switch}>
              <input 
                type="checkbox" 
                checked={dementiaMode}
                onChange={(e) => setDementiaMode(e.target.checked)}
              />
              <span className={styles.slider}></span>
              <span className={styles.switchLabel}>Dementia Mode</span>
            </label>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>×</button>
          </div>
        </div>
        
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${message.role === 'user' ? styles.user : styles.assistant}`}>
              {message.content}
            </div>
          ))}
          {isLoading && <div className={styles.loading}>Thinking...</div>}
        </div>
        
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about file conversion..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>Send</button>
        </form>
      </div>
    </>
  );
} 