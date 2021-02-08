package com.springboot.crud_security.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
//@Data
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "name")
    private RoleName roleName;

    @ManyToMany(mappedBy = "roles")
//    @JoinTable(name = "user_roles"
//            , joinColumns = @JoinColumn(name = "role_id")
//            , inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users;

    public Role(RoleName roleName) {
        this.roleName = roleName;
    }

    @Override
    public String getAuthority() {
        return roleName.name();
    }

    @Override
    public String toString() {
        return getAuthority();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Role)) return false;
        Role role = (Role) o;
        return getRoleName() == role.getRoleName();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRoleName());
    }
}
