import { Metadata } from 'next';
import ChatInterface from '@/components/chat/chat-interface';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('Chat'),
  };
}

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-12rem)]">
      <ChatInterface />
    </div>
  );
}
