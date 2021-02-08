package com.springboot.crud_security.controller;

import com.springboot.crud_security.entity.Role;
import com.springboot.crud_security.entity.User;
import com.springboot.crud_security.service.RoleService;
import com.springboot.crud_security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;
    private final BCryptPasswordEncoder passwordEncoder;
    private String patchedPassword;

    @Autowired
    public AdminController(UserService userService
            , RoleService roleService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public String getAllUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());

        return "all_users";
    }

    @GetMapping("/add-new-user")
    public String addUser(Model model) {
        model.addAttribute("new_user", new User());
//        model.addAttribute("allRoles", roleService.getAllRoles());

        return "user_create";
    }

    @PostMapping
    public String saveUser(@ModelAttribute("new_user") User user
                            , @RequestParam("new_roles") String[] roles) {

        user.setRoles(getSetFromArray(roles));
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userService.saveOrUpdateUser(user);

        return "redirect:/admin";
    }

    @GetMapping("/{id}/update")
    public String updateInfo(@PathVariable(name = "id") Integer id, Model model) {
        User patchedUser = userService.getUserById(id);
        patchedPassword = patchedUser.getPassword();

        model.addAttribute("patchedUser", patchedUser);
//        model.addAttribute("allRoles", roleService.getAllRoles());

        return "user_update";
    }

    @PatchMapping
    public String updateUser(@ModelAttribute("patchedUser") User user
                            , @RequestParam("patched_roles") String[] roles) {

        user.setRoles(getSetFromArray(roles));

        if (!patchedPassword.equals(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        userService.saveOrUpdateUser(user);

        return "redirect:/admin";
    }

    @GetMapping("/{id}/delete")
    public String deleteInfo(@PathVariable(name = "id") Integer id, Model model) {
        model.addAttribute("deletedUser", userService.getUserById(id));
        return "user_delete";
    }

    @DeleteMapping
    public String deleteUser(@ModelAttribute("deletedUser") User user) {
        userService.deleteUser(user);
        return "redirect:/admin";
    }

    @ModelAttribute("allRoles")
    private Set<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    private Set<Role> getSetFromArray(String[] roles) {

        return roleService.getAllRoles()
                            .stream().filter(role -> Arrays.asList(roles)
                            .contains(role.getRoleName()))
                            .collect(Collectors.toSet());
    }
}
