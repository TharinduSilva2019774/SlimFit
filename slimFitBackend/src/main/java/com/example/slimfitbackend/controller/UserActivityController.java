package com.example.slimfitbackend.controller;

import com.example.slimfitbackend.payload.NewActivityRequest;
import com.example.slimfitbackend.payload.NewActivityResponse;
import com.example.slimfitbackend.service.UserActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/activity")
public class UserActivityController {

    @Autowired
    private UserActivityService userActivityService;

    @PostMapping("/newActivity")
    public NewActivityResponse addNewActivity(@RequestBody NewActivityRequest newActivityRequest) throws Exception {
        return userActivityService.addNewActivity(newActivityRequest);
    }

}
