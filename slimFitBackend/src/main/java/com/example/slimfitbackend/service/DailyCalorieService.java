package com.example.slimfitbackend.service;

import com.example.slimfitbackend.model.DailyCalorie;
import com.example.slimfitbackend.payload.DailyCalorieResponseDto;
import com.example.slimfitbackend.payload.GetDailyCalorieDto;
import com.example.slimfitbackend.payload.common.MapStructMapper;
import com.example.slimfitbackend.repository.DailyCalorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class DailyCalorieService {

    @Autowired
    private DailyCalorieRepository dailyCalorieRepository;

    @Autowired
    private MapStructMapper mapStructMapper;

    private int calorieDeficitPerToday(int weightLossPerWeekInG){

        if (weightLossPerWeekInG>500){
            // throw exception not very safe
        }

        double weightLossPerWeekInKG = (double) weightLossPerWeekInG / 1000;

        int oneKGFat = 7700;
        return (int) ((weightLossPerWeekInKG * oneKGFat)/7);
    }

    public DailyCalorieResponseDto getDailyCalorieResponse(@RequestBody GetDailyCalorieDto getDailyCalorieDto){
        Optional<DailyCalorie> optDailyCal = dailyCalorieRepository.findByDate(getDailyCalorieDto.getDate());
        DailyCalorie dailyCalorie;
        if(optDailyCal.isEmpty()){
            dailyCalorie = new DailyCalorie();
        }

        // get from db compairing date if not found create
        return new DailyCalorieResponseDto();
    }
}
