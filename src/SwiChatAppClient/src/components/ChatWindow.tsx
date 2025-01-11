import React from "react";

const ChatWindow: React.FC = () => {
    const mockMessages = [
        { id: 1, sender: "Alice", text: "Hey Bob, did you finish the project?" },
        { id: 2, sender: "Bob", text: "Not yet, Alice. I'm working on the final touches. What about you?" },
        { id: 3, sender: "Alice", text: "I'm done! Sent it to the team this morning." },
        { id: 4, sender: "Bob", text: "That's great! I should have it wrapped up by noon." },
        { id: 5, sender: "Alice", text: "Perfect. Let's review it together after lunch." },
        { id: 6, sender: "Bob", text: "Sounds good. I'll ping you once I'm ready." },
        { id: 7, sender: "Alice", text: "Cool. By the way, did you see the latest update from the client?" },
    ];

    return (
        <div className="col-9" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Chat Header */}
            <div className="d-flex align-items-center justify-content-between pt-2 px-3">
                <div className="d-flex align-items-center">
                    {/* Profile Picture */}
                    <img
                        //src="https://via.placeholder.com/40"
                        alt="Profile"
                        className="rounded-circle me-3"
                        style={{ width: "40px", height: "40px" }}
                    />
                    {/* Name of Chat */}
                    <h5 className="mb-0">Alice</h5>
                </div>
                {/* Call Icons */}
                <div>
                    <i className="bi bi-telephone-fill me-3" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
                    <i className="bi bi-camera-video-fill" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
                </div>
            </div>
            <div className="border-top my-4"></div>
            <div
                style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    paddingRight: "10px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
                className="custom-scrollbar"
            >
                {mockMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`d-flex ${message.sender === "Alice" ? "justify-content-start" : "justify-content-end"} mb-3`}
                    >
                        <div
                            className="border py-2 px-4 rounded"
                            style={{
                                maxWidth: "75%",
                                wordWrap: "break-word",
                                backgroundColor: message.sender === "Alice" ? "#f8f9fa" : "#e9ecef",
                            }}
                        >
                            <div className="fw-bold">{message.sender}</div>
                            <div>{message.text}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input for New Message */}
            <div className="mt-3 d-flex">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Type your message..."
                />
                <button className="btn btn-primary">Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;