package com.springboot.crud_security.rest;

import com.springboot.crud_security.entity.User;
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
    private final UserDetailsService userDetailsService;

    @Autowired
    public RestAPI(UserService userService
            , @Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService) {
        this.userService = userService;
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
}
