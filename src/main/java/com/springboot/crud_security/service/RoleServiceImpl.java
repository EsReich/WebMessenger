package com.springboot.crud_security.service;

import com.springboot.crud_security.dao.RoleRepository;
import com.springboot.crud_security.entity.Role;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Cacheable(value = "myCache")
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Set<Role> getAllRoles() {
        return new HashSet<>(roleRepository.findAll());
    }
}
