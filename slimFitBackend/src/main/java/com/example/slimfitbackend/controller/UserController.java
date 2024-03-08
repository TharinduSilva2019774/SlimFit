package com.example.slimfitbackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
public class UserController {

    @GetMapping("/")
    public String defualt() {
        return "Helloworld";
    }

}
