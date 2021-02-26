package com.springboot.crud_security.rest;

import com.springboot.crud_security.entity.User;
import com.springboot.crud_security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestAPI {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;

    @Autowired
    public RestAPI(UserService userService, BCryptPasswordEncoder passwordEncoder
            , @Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/current")
    public User getCurrentUser(@AuthenticationPrincipal User user) {
        return user;
    }

    @GetMapping("/admin")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/admin")
    public User saveUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveOrUpdateUser(user);
        return (User) userDetailsService.loadUserByUsername(user.getEmail());
    }

    @PatchMapping("/admin")
    public User updateUser(@RequestBody User user) {
        userService.saveOrUpdateUser(user);
        return user;
    }

    @DeleteMapping("/admin/{id}")
    public User deleteUser(@PathVariable("id") int id) {
        User deletedUser = userService.getUserById(id);
        userService.deleteUser(deletedUser);
        return deletedUser;
    }
}
