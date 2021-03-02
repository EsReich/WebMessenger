package com.springboot.crud_security.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties(ignoreUnknown = true)
public class User implements UserDetails {

    @JsonIgnore
    @Column(name = "enabled")
    private boolean isActive = true;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

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
    @ManyToMany
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

    @JsonIgnore
    @Override
    public Set<Role> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return isActive;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return isActive;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return isActive;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return isActive;
    }
}
