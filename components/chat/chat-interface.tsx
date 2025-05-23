'use client';

import { useEffect, useRef, useState } from 'react';
import { useChatStore, Message } from '@/lib/store/chat-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { useTranslations } from 'next-intl';

const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div
      className={cn(
        'flex w-full',
        message.type === 'user' ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-2',
          message.type === 'user'
            ? 'bg-primary text-primary-foreground dark:bg-blue-600 dark:text-white'
            : 'bg-muted',
        )}
      >
        <div
          className={cn(
            'prose prose-sm max-w-none',
            message.type === 'user'
              ? 'prose-invert'
              : 'prose-neutral dark:prose-invert',
          )}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        <span
          className={cn(
            'text-xs opacity-70',
            message.type === 'user'
              ? 'text-primary-foreground'
              : 'text-secondary-foreground',
          )}
        >
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

const ChatInterface = () => {
  const t = useTranslations();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    addMessage(input, 'user');
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      addMessage(input, 'ai');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message: Message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('ChatPlaceholder')}
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={cn(
            'transition-all duration-300',
            isLoading && 'opacity-50',
          )}
        >
          <Send className={cn('h-4 w-4', isLoading && 'animate-pulse')} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
