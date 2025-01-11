import React from "react";
import { useAuth } from "./AuthContext";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const Messenger: React.FC = () => {
    const { setUser } = useAuth();

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="container mt-5" style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
            <div className="row flex-grow-1 align-items-center p-3 rounded shadow-lg border bg-white" style={{ overflow: "hidden" }}>
                <Sidebar />
                <ChatWindow />
            </div>
            {/* Header section for Logout button */}
            <div className="row justify-content-end pt-3">
                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Messenger;