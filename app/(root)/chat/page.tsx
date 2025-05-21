import { Metadata } from "next";
import ChatInterface from "@/components/chat/chat-interface";

export const metadata: Metadata = {
    title: "Chat",
};

export default function ChatPage() {
    return (
        <div className="flex h-[calc(100vh-12rem)]">
            <ChatInterface />
        </div>
    );
} 