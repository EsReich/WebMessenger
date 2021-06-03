package com.springboot.crud_security.service;

import com.springboot.crud_security.dao.MessageRepository;
import com.springboot.crud_security.entity.Message;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Cacheable(value = "myCache")
//@Cacheable(cacheNames = {"myCache"})
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @Override
    public void saveOrUpdateMessage(Message message) {
        LocalDateTime now = LocalDateTime.now().withNano(0);
        message.setCurrentDateAndTime(now);

        if (message.getId() != null) {
            message.setEdited(true);
        }
        messageRepository.save(message);
    }

    @Override
    public void deleteMessage(Message message) {
        messageRepository.delete(message);
    }

    @Override
    public Message getMessageById(Long id) {
        return messageRepository.findById(id).orElseGet(Message::new);
    }

    @Override
    public Message getMessageByCurrentDateAndTime(LocalDateTime date) {
        return messageRepository.findMessageByCurrentDateAndTime(date);
    }

}
