import { Chat } from "./Chat";

export interface SidebarProps {
    onChatSelect: (chat: Chat) => void;
}