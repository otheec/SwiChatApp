import React, { useEffect, useState } from "react";
import axios from "axios";
import placeholderImg from "../assets/profile-placeholder.png";
import { useAuth } from "./AuthContext";

interface Message {
    id: number;
    senderId: number;
    senderName: string;
    content: string;
}

interface ChatWindowProps {
    chatId: number | null;
    participants: { id: number; username: string }[] | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, participants }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const { user } = useAuth(); 

    const fetchMessages = async () => {
        if (!chatId) return;
        try {
            const response = await axios.get(`http://localhost:8080/api/messages/chat/${chatId}`);
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = async () => {
        if (!chatId || newMessage.trim() === "" || !participants) return;
        try {
            const senderId = user!.id;
            const response = await axios.post("http://localhost:8080/api/messages", {
                chatId,
                senderId,
                content: newMessage,
            });
            setMessages((prevMessages) => [...prevMessages, response.data]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [chatId]);

    return (
        <div className="col-9 d-flex flex-column">
            {/* Chat Header */}
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                <div className="d-flex align-items-center">
                    <img
                        src={placeholderImg}
                        alt="Profile"
                        className="rounded-circle me-3"
                        style={{ width: "40px", height: "40px" }}
                    />
                    <h5 className="mb-0">{participants?.map((p) => p.username).join(", ")}</h5>
                </div>
            </div>

            {/* Messages Section */}
            <div
                style={{
                    flexGrow: 1, // Occupy remaining space
                    overflowY: "auto", // Enable vertical scrolling
                    padding: "10px",
                }}
                className="custom-scrollbar"
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`d-flex ${
                            message.senderId === user!.id
                                ? "justify-content-end"
                                : "justify-content-start"
                        } mb-3`}
                    >
                        <div
                            className="border py-2 px-4 rounded"
                            style={{
                                maxWidth: "75%",
                                wordWrap: "break-word",
                                backgroundColor: message.senderId === user!.id ? "#e9ecef" : "#f8f9fa",
                            }}
                        >
                            <div className="fw-bold">{message.senderName}</div>
                            <div>{message.content}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="mt-3 d-flex border-top p-3">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="btn btn-primary" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
