package com.example.slimfitbackend.controller;

import com.example.slimfitbackend.payload.GetUserResponse;
import com.example.slimfitbackend.payload.SaveUserRequest;
import com.example.slimfitbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public boolean createNewUser(@RequestBody SaveUserRequest saveUserRequest) {
        return userService.createNewUser(saveUserRequest);
    }

    @GetMapping("")
    private GetUserResponse getUser() throws Exception {
        return userService.getUser();
    }

}
