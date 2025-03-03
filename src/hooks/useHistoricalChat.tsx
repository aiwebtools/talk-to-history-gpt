
import { useState, useCallback } from 'react';
import { type HistoricalFigure, type Message } from '@/lib/constants';

interface UseHistoricalChatParams {
  character?: HistoricalFigure;
}

export function useHistoricalChat({ character }: UseHistoricalChatParams = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const initializeChat = useCallback((selectedCharacter: HistoricalFigure) => {
    const initialMessage: Message = {
      id: '1',
      content: `Greetings! I am ${selectedCharacter.name}. What would you like to know about my life, work, or the time in which I lived?`,
      role: 'assistant',
      timestamp: Date.now(),
    };
    
    setMessages([initialMessage]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response from the historical character. In a full implementation, this would be integrated with an AI service that would maintain the persona of the selected historical figure.`,
        role: 'assistant',
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    initializeChat,
  };
}
