package com.example.swichatappserver.service;

import com.example.swichatappserver.model.dto.UserDto;
import com.example.swichatappserver.model.dto.YourChatDto;
import com.example.swichatappserver.model.entity.Chat;
import com.example.swichatappserver.model.entity.Message;
import com.example.swichatappserver.repository.ChatRepository;
import com.example.swichatappserver.repository.MessageRepository;
import com.example.swichatappserver.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    public ChatService(ChatRepository chatRepository, UserRepository userRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    public Chat createChat(String chatName, List<Long> participantIds) {
        Chat chat = new Chat(chatName);
        participantIds.forEach(id -> userRepository.findById(id).ifPresent(chat::addParticipant));
        return chatRepository.save(chat);
    }

    public List<YourChatDto> getChatsByUserId(Long userId) {
        return chatRepository.findByParticipants_Id(userId).stream()
                .map(chat -> buildYourChatDto(chat, userId))
                .collect(Collectors.toList());
    }

    public YourChatDto getChatWithDetailsById(Long chatId, Long userId) {
        Chat chat = Optional.ofNullable(chatRepository.findChatById(chatId))
                .orElseThrow(() -> new IllegalArgumentException("Chat not found with ID: " + chatId));
        return buildYourChatDto(chat, userId);
    }

    private YourChatDto buildYourChatDto(Chat chat, Long userId) {
        List<UserDto> participants = getParticipantsExcludingUser(chat, userId);
        String lastMessage = getLastMessageContent(chat);
        return new YourChatDto(chat.getId(), participants, lastMessage);
    }

    private List<UserDto> getParticipantsExcludingUser(Chat chat, Long userId) {
        return chat.getParticipants().stream()
                .filter(user -> !user.getId().equals(userId)) // Exclude the requester
                .map(user -> new UserDto(user.getId(), user.getUsername()))
                .collect(Collectors.toList());
    }

    private String getLastMessageContent(Chat chat) {
        return messageRepository.findTopByChatOrderByTimestampDesc(chat)
                .map(Message::getContent)
                .orElse("No messages yet");
    }
}