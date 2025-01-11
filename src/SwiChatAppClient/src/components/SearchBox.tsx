import React, { useState } from "react";
import axios from "axios";
import UserSuggestionList from "./UserSuggestionList";

interface User {
    id: number;
    username: string;
}

const SearchBox: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [suggestions, setSuggestions] = useState<User[]>([]);

    const fetchSuggestions = async (query: string) => {
        try {
            const response = await axios.post("http://localhost:8080/api/users/username-containing", {
                username: query,
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() !== "") {
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionSelect = (username: string) => {
        setSearchTerm(username);
        setSuggestions([]);
    };

    return (
        <div className="position-relative">
            <input
                type="text"
                className="form-control"
                id="friendSearch"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <UserSuggestionList
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
            />
        </div>
    );
};

export default SearchBox;