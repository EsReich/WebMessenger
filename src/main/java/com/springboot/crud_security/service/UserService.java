package com.springboot.crud_security.service;

import com.springboot.crud_security.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    void saveOrUpdateUser(User user);
    void deleteUser(User user);
    User getUserById(Long id);
}
