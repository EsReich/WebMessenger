package com.springboot.crud_security.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
//@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Column(name = "enabled")
    private boolean isActive = true;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "age")
    private byte age;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

//    @ManyToMany(
//            cascade = {CascadeType.DETACH, CascadeType.MERGE
//                    , CascadeType.PERSIST, CascadeType.REFRESH},
//            fetch = FetchType.EAGER)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles"
            , joinColumns = @JoinColumn(name = "user_id")
            , inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public User(String name, String surname, byte age, String email, String password) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.email = email;
        this.password = password;
    }

//    @Override
//    public Set<SimpleGrantedAuthority> getAuthorities() {
//
//        return roles.stream()
//                .map(role -> new SimpleGrantedAuthority(role.getRoleName().name()))
//                .collect(Collectors.toSet());
//    }

    @Override
    public Set<Role> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isActive;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isActive;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isActive;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }
}
