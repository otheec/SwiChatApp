package com.example.swichatappserver.model.request;

import java.util.List;

public class ChatCreationRequest {
    private String chatName;
    private List<Long> participantIds;

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public List<Long> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<Long> participantIds) {
        this.participantIds = participantIds;
    }
}
