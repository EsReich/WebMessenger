package com.springboot.crud_security.dao;

import com.springboot.crud_security.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m where m.currentDateAndTime = :date")
    Message findMessageByCurrentDateAndTime(@Param("date") LocalDateTime date);
}
