package com.example.swichatappserver.controller;

import com.example.swichatappserver.model.dto.MessageDto;
import com.example.swichatappserver.model.entity.Message;
import com.example.swichatappserver.model.request.MessageCreationRequest;
import com.example.swichatappserver.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public MessageDto sendMessage(@RequestBody MessageCreationRequest request) {
        Message message = messageService.sendMessage(request.getChatId(), request.getSenderId(), request.getContent());
        return new MessageDto(message.getId(), message.getContent(), message.getSender().getId(), message.getSender().getUsername());
    }

    @GetMapping("/chat/{chatId}")
    public List<MessageDto> getMessagesByChatId(@PathVariable Long chatId) {
        return messageService.getMessagesByChatId(chatId).stream()
                .map(message -> new MessageDto(message.getId(), message.getContent(), message.getSender().getId(), message.getSender().getUsername()))
                .collect(Collectors.toList());
    }
}
