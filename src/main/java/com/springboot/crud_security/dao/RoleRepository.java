package com.springboot.crud_security.dao;

import com.springboot.crud_security.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
