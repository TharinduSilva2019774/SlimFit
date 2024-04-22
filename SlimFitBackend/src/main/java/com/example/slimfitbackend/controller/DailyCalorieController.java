package com.example.slimfitbackend.controller;

import com.example.slimfitbackend.payload.DailyCalorieResponseDto;
import com.example.slimfitbackend.payload.GetDailyCalorieDto;
import com.example.slimfitbackend.payload.SearchFoodCalRequest;
import com.example.slimfitbackend.payload.SearchFoodCalResponse;
import com.example.slimfitbackend.service.DailyCalorieService;
import com.example.slimfitbackend.service.IntakeRecordService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/v1/calorie")
public class DailyCalorieController {

    @Autowired
    private DailyCalorieService dailyCalorieService;

    @Autowired
    private IntakeRecordService intakeRecordService;

    @GetMapping(value = "/dailyDetails" , produces = MediaType.APPLICATION_JSON_VALUE)
    public DailyCalorieResponseDto dailyDetails(@Valid GetDailyCalorieDto getDailyCalorieDto) throws Exception {
        return dailyCalorieService.getDailyCalorieResponse(getDailyCalorieDto);
    }

    @GetMapping(value = "/searchFoodCal" , produces = MediaType.APPLICATION_JSON_VALUE)
    public SearchFoodCalResponse searchFoodCal(@Valid SearchFoodCalRequest searchFoodCalRequest) throws JsonProcessingException {
        return intakeRecordService.getCalorieForFood(searchFoodCalRequest);
    }


}
