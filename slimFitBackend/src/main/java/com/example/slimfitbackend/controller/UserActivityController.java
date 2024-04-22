package com.example.slimfitbackend.controller;

import com.example.slimfitbackend.payload.*;
import com.example.slimfitbackend.payload.NewActivityRequest;
import com.example.slimfitbackend.payload.NewActivityResponse;
import com.example.slimfitbackend.payload.PredictCalorieRequest;
import com.example.slimfitbackend.payload.PredictCalorieResponse;
import com.example.slimfitbackend.service.UserActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/activity")
public class UserActivityController {

    @Autowired
    private UserActivityService userActivityService;

    @PostMapping("/newActivity")
    public NewActivityResponse addNewActivity(@RequestBody NewActivityRequest newActivityRequest) throws Exception {
        return userActivityService.addNewActivity(newActivityRequest);
    }

    @GetMapping("/calorie")
    public PredictCalorieResponse getPredictedCal(@Valid PredictCalorieRequest predictCalorieRequest) throws Exception {
        return userActivityService.getPredictedCalForAct(predictCalorieRequest);
    }

    @GetMapping("/activities")
    public List<GetActivitiesResponse> getActivities() {
        return userActivityService.getActivities();
    }

}
