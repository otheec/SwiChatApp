export interface Chat {
    id: number;
    participants: { id: number; username: string }[];
    lastMessage: string;
}