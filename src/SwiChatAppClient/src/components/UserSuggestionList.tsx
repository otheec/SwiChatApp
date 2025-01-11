import React from "react";
import placeholderImg from "../assets/profile-placeholder.png";

interface User {
    id: number;
    username: string;
}

interface UserSuggestionListProps {
    suggestions: User[];
    onSelect: (username: string) => void;
}

const UserSuggestionList: React.FC<UserSuggestionListProps> = ({ suggestions, onSelect }) => {
    return (
        <>
            {suggestions.length > 0 && (
                <ul
                    className="list-group position-absolute mt-1 w-100"
                    style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
                >
                    {suggestions.slice(0, 3).map((user) => (
                        <li
                            key={user.id}
                            className="list-group-item list-group-item-action d-flex align-items-center"
                            onClick={() => onSelect(user.username)}
                        >
                            {/* Profile Picture */}
                            <img
                                src={placeholderImg} // Replace with actual profile image if available
                                alt={`${user.username}'s profile`}
                                className="rounded-circle me-2"
                                style={{ width: "30px", height: "30px", objectFit: "cover" }}
                            />
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default UserSuggestionList;
