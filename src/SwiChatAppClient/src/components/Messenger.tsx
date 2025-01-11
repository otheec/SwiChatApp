import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const Messenger: React.FC = () => {
    const [selectedChat, setSelectedChat] = useState<{
        id: number;
        participants: { id: number; username: string }[];
    } | null>(null);

    return (
        <div className="container mt-5" style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
            <div className="row flex-grow-1 align-items-center p-3 rounded shadow-lg border bg-white">
                <Sidebar onChatSelect={(chat) => setSelectedChat(chat)} />
                {selectedChat ? (
                    <ChatWindow chatId={selectedChat.id} participants={selectedChat.participants} />
                ) : (
                    <div className="col-9 d-flex align-items-center justify-content-center">
                        <h5>Select a chat to start messaging</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messenger;