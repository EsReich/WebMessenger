package com.springboot.crud_security.service;

import com.springboot.crud_security.entity.Role;

import java.util.Set;

public interface RoleService {
    Set<Role> getAllRoles();
}
