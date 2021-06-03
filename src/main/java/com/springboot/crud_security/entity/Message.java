package com.springboot.crud_security.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "messages")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "author")
    private String author;   //здесь должна быть связь @ManyToOne с User'ом, а не это г

    @Column(name = "content")
    private String content;

    @Column(name = "current_date_and_time")
    private LocalDateTime currentDateAndTime;

    @Column(name = "is_edited")
    private boolean isEdited;
}
