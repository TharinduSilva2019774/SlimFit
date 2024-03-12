package com.example.slimfitbackend.controller;

import com.example.slimfitbackend.payload.DailyCalorieResponseDto;
import com.example.slimfitbackend.payload.GetDailyCalorieDto;
import com.example.slimfitbackend.service.DailyCalorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@CrossOrigin
public class DailyCalorieController {

    @Autowired
    private DailyCalorieService dailyCalorieService;

    @GetMapping(value = "/dailyDetails" , produces = MediaType.APPLICATION_JSON_VALUE)
    public DailyCalorieResponseDto dailyDetails(@Valid GetDailyCalorieDto getDailyCalorieDto) {
        return dailyCalorieService.getDailyCalorieResponse(getDailyCalorieDto);
    }

}
