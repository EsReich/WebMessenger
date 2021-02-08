package com.springboot.crud_security.dao;

import com.springboot.crud_security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    public User findUserByEmail(String email);
}
