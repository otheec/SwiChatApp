import React, { useEffect, useState } from "react";
import placeholderImg from "../assets/profile-placeholder.png";
import SearchBox from "./SearchBox";
import { useAuth } from "./AuthContext";
import { fetchUserChats } from "../services/chatService";
import { Chat } from "../model/Chat";
import { SidebarProps } from "../model/SidebarProps";

const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const loadChats = async () => {
            if (user) {
                try {
                    const data = await fetchUserChats(user.id);
                    setChats(data);
                } catch (error) {
                    console.error("Error fetching chats:", error);
                }
            }
        };
        loadChats();
    }, [user]);

    const handleChatSelect = (chat: Chat) => {
        setSelectedChatId(chat.id);
        onChatSelect(chat);
    };

    return (
        <div className="col-3 border-end pe-3 d-flex flex-column" style={{ height: "100%" }}>
            {/* Search Box */}
            <div className="mb-3">
                <SearchBox />
            </div>

            {/* Chats List */}
            <ul className="list-unstyled flex-grow-1 overflow-auto" style={{ margin: 0, padding: 0 }}>
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className={`d-flex align-items-center py-2 border-bottom ${
                            selectedChatId === chat.id ? "bg-light" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleChatSelect(chat)}
                    >
                        <img
                            src={placeholderImg}
                            alt={`Chat with ${chat.participants[0]?.username}`}
                            className="rounded-circle me-3"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                        <div className="d-flex flex-column">
                            <strong>{chat.participants.map((p) => p.username).join(", ")}</strong>
                            <small className="text-muted">{chat.lastMessage}</small>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
