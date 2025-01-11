package com.example.swichatappserver.model.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @ManyToMany(mappedBy = "participants")
    private List<Chat> chats;

    public User() {
        this.chats = new ArrayList<>();
    }

    public User(String username) {
        this.username = username;
        this.chats = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public List<Chat> getChats() {
        return chats;
    }

    public void addChat(Chat chat) {
        this.chats.add(chat);
    }
}
