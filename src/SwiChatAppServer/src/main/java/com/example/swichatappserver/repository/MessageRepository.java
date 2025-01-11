package com.example.swichatappserver.repository;

import com.example.swichatappserver.model.entity.Chat;
import com.example.swichatappserver.model.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatId(Long chatId);
    Optional<Message> findTopByChatOrderByTimestampDesc(Chat chat);
}
