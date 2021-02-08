package com.springboot.crud_security.service;

import com.springboot.crud_security.entity.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public void saveOrUpdateUser(User user);
    public void deleteUser(User user);
    public User getUserById(Integer id);
}
