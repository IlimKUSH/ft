import { create } from 'zustand';

export interface Message {
    id: string;
    content: string;
    type: 'user' | 'ai';
    timestamp: Date;
}

interface ChatStore {
    messages: Message[];
    addMessage: (content: string, type: 'user' | 'ai') => void;
    clearMessages: () => void;
}

type ChatStoreState = {
    messages: Message[];
};

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    addMessage: (content: string, type: 'user' | 'ai') => set((state: ChatStoreState) => ({
        messages: [...state.messages, {
            id: crypto.randomUUID(),
            content,
            type,
            timestamp: new Date(),
        }],
    })),
    clearMessages: () => set({ messages: [] }),
})); 