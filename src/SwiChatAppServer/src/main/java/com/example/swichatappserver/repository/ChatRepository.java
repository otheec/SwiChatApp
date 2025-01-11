package com.example.swichatappserver.repository;

import com.example.swichatappserver.model.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByParticipants_Id(Long userId);
    Chat findChatById(Long chatId);
}