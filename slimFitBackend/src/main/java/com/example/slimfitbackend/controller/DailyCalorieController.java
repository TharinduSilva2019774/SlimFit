package com.example.slimfitbackend.controller;

import com.example.slimfitbackend.payload.DailyCalorieResponseDto;
import com.example.slimfitbackend.payload.GetDailyCalorieDto;
import com.example.slimfitbackend.service.DailyCalorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class DailyCalorieController {

    @Autowired
    private DailyCalorieService dailyCalorieService;

    @GetMapping("/dailyDetails")
    public DailyCalorieResponseDto dailyDetails(GetDailyCalorieDto getDailyCalorieDto) {
        return dailyCalorieService.getDailyCalorieResponse(getDailyCalorieDto);
    }

}
