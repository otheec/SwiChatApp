package com.example.swichatappserver.model.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User sender;

    @Column(nullable = false)
    private String content;

    @ManyToOne(optional = false)
    private Chat chat;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public Message() {}

    public Message(User sender, String content, Chat chat, LocalDateTime timestamp) {
        this.sender = sender;
        this.content = content;
        this.chat = chat;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public User getSender() {
        return sender;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}

