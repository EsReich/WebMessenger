package com.springboot.crud_security.service;

import com.springboot.crud_security.entity.Message;

import java.time.LocalDateTime;
import java.util.List;

public interface MessageService {
    List<Message> getAllMessages();
    void saveOrUpdateMessage(Message message);
    void deleteMessage(Message message);
    Message getMessageById(Long id);
    Message getMessageByCurrentDateAndTime(LocalDateTime date);
}
