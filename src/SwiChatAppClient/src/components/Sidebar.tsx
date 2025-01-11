import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; 

interface Chat {
    id: number;
    participants: { id: number; username: string }[];
    lastMessage: string
}

const Sidebar: React.FC = () => {
    const { user } = useAuth(); // Get the currently logged-in user
    const [chats, setChats] = useState<Chat[]>([]); 

    const fetchChats = async () => {
        if (!user) return; // Ensure a user is logged in
        try {
            const response = await axios.get(`http://localhost:8080/api/chats/user/${user.id}`);
            console.log("Fetched Chats:", response.data);
            setChats(response.data);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [user]); // Refetch chats if the user changes

    return (
        <div className="col-3 border-end pe-3 d-flex flex-column" style={{ height: "100%" }}>
            {/* Search Bar */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="friendSearch"
                    placeholder="Search chats..."
                />
            </div>

            {/* Chats List */}
            <ul className="list-unstyled flex-grow-1 overflow-auto" style={{ margin: 0, padding: 0 }}>
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className="d-flex align-items-center py-2 border-bottom"
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={`https://via.placeholder.com/50?text=${chat.id}`}
                            alt={`Chat ${chat.id}`}
                            className="rounded-circle me-3"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                        <div className="d-flex flex-column">
                            <strong>{chat.participants.map((p) => p.username).join(", ")}</strong>
                            <small className="text-muted">
                                {chat.lastMessage}
                            </small>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;