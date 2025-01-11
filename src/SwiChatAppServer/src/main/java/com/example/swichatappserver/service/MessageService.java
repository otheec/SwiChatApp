package com.example.swichatappserver.service;

import com.example.swichatappserver.model.entity.Chat;
import com.example.swichatappserver.model.entity.Message;
import com.example.swichatappserver.model.entity.User;
import com.example.swichatappserver.repository.ChatRepository;
import com.example.swichatappserver.repository.MessageRepository;
import com.example.swichatappserver.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, ChatRepository chatRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    public Message sendMessage(Long chatId, Long senderId, String content) {
        Optional<Chat> chat = chatRepository.findById(chatId);
        Optional<User> sender = userRepository.findById(senderId);

        if (chat.isEmpty() || sender.isEmpty()) {
            throw new IllegalArgumentException("Invalid chat or user");
        }

        Message message = new Message(sender.get(), content, chat.get(), LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<Message> getMessagesByChatId(Long chatId) {
        return messageRepository.findByChatId(chatId);
    }
}
