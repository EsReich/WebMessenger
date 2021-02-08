package com.springboot.crud_security.controller;

import com.springboot.crud_security.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {

    @Qualifier("userDetailsServiceImpl")
    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping
    public String getUserPage(Principal principal, Model model) {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        model.addAttribute("user", user);

//        model.addAttribute("principal", principal);

        return "user_page";
    }
}
