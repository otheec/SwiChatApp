import axios from "axios";
import { Chat } from "../model/Chat";

export const fetchUserChats = async (userId: number): Promise<Chat[]> => {
    const response = await axios.get<Chat[]>(`http://localhost:8080/api/chats/user/${userId}`);
    return response.data;
};