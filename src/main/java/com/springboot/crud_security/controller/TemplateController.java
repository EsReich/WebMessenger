package com.springboot.crud_security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TemplateController {

    @GetMapping("/user")
    public String getUserPage() {
        return "user_page";
    }

    @GetMapping("/admin")
    public String getAdminPage() {
        return "admin_page";
    }
}
