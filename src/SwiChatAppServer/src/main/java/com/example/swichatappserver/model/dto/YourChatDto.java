package com.example.swichatappserver.model.dto;

import java.util.List;

public class YourChatDto {
    private Long id;
    private List<UserDto> participants; // Exclude the requester from this list
    private String lastMessage; // Last message in the chat

    public YourChatDto(Long id, List<UserDto> participants, String lastMessage) {
        this.id = id;
        this.participants = participants;
        this.lastMessage = lastMessage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<UserDto> getParticipants() {
        return participants;
    }

    public void setParticipants(List<UserDto> participants) {
        this.participants = participants;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }
}
