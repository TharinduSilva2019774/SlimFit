package com.example.slimfitbackend.controller;

import com.example.slimfitbackend.payload.SaveUserRequest;
import com.example.slimfitbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String defualt() {
        return "Helloworld";
    }

    @PostMapping("/newUser")
    public boolean createNewUser(@RequestBody SaveUserRequest saveUserRequest) {
        return userService.createNewUser(saveUserRequest);
    }

}
