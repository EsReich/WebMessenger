package com.springboot.crud_security.controller.rest;

import com.springboot.crud_security.entity.Message;
import com.springboot.crud_security.entity.User;
import com.springboot.crud_security.service.MessageService;
import com.springboot.crud_security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestAPI {

    private final UserService userService;
    private final MessageService messageService;
    private final UserDetailsService userDetailsService;

    @Autowired
    public RestAPI(UserService userService, MessageService messageService
            , @Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService) {
        this.userService = userService;
        this.messageService = messageService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/admin")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        userService.saveOrUpdateUser(user);
        return ResponseEntity.ok((User) userDetailsService.loadUserByUsername(user.getEmail()));
    }

    @PutMapping("/admin")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.saveOrUpdateUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        User deletedUser = userService.getUserById(id);
        userService.deleteUser(deletedUser);
        return ResponseEntity.ok(deletedUser);
    }

    @GetMapping("/message")
    public ResponseEntity<List<Message>> getAllMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    @PostMapping("/message")
    public ResponseEntity<Message> saveMessage(@RequestBody Message message) {
//        String DateTime = LocalDateTime.now()
//                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss"));

        messageService.saveOrUpdateMessage(message);
        return ResponseEntity.ok(
                messageService.getMessageByCurrentDateAndTime(message.getCurrentDateAndTime())
        );
    }

    @PutMapping("/message")
    public ResponseEntity<Message> updateMessage(@RequestBody Message message) {
        messageService.saveOrUpdateMessage(message);
        return ResponseEntity.ok(
                messageService.getMessageByCurrentDateAndTime(message.getCurrentDateAndTime())
        );
    }

    @DeleteMapping("/message/{id}")
    public ResponseEntity<Message> deleteMessage(@PathVariable("id") Long id) {
        Message deletedMessage = messageService.getMessageById(id);
        messageService.deleteMessage(deletedMessage);
        return ResponseEntity.ok(deletedMessage);
    }
}
