package com.example.swichatappserver.controller;

import com.example.swichatappserver.model.dto.ChatDto;
import com.example.swichatappserver.model.dto.UserDto;
import com.example.swichatappserver.model.dto.YourChatDto;
import com.example.swichatappserver.model.entity.Chat;
import com.example.swichatappserver.model.request.ChatCreationRequest;
import com.example.swichatappserver.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatDto createChat(@RequestBody ChatCreationRequest request) {
        Chat chat = chatService.createChat(request.getChatName(), request.getParticipantIds());
        List<UserDto> participants = chat.getParticipants().stream()
                .map(user -> new UserDto(user.getId(), user.getUsername()))
                .collect(Collectors.toList());
        return new ChatDto(chat.getId(), participants);
    }

    @GetMapping("/user/{userId}")
    public List<YourChatDto> getChatsByUserId(@PathVariable Long userId) {
        return chatService.getChatsByUserId(userId);
    }
}
