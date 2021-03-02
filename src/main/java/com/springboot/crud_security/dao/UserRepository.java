package com.springboot.crud_security.dao;

import com.springboot.crud_security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u join fetch u.roles where u.email = :email") //заменяет FetchType.EAGER в модели
    User findUserByEmailFetchRoles(@Param("email") String email);

    @Query("select u from User u join fetch u.roles where u.id = :id")
    User findByIdFetchRoles(@Param("id") Long id);
}
