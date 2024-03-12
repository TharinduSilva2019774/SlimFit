package com.example.slimfitbackend.service;

import com.example.slimfitbackend.model.DailyCalorie;
import com.example.slimfitbackend.payload.DailyCalorieResponseDto;
import com.example.slimfitbackend.payload.GetDailyCalorieDto;
import com.example.slimfitbackend.payload.common.MapStructMapper;
import com.example.slimfitbackend.repository.DailyCalorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
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
            // throw exception not recommended
        }

        double weightLossPerWeekInKG = (double) weightLossPerWeekInG / 1000;

        int oneKGFat = 7700;
        return (int) ((weightLossPerWeekInKG * oneKGFat)/7);
    }

    private void devideCaloriesForMeals(int calorieIntakePerDay, DailyCalorie dailyCalorie){
        // breakfast 25
        // lunch 30
        // dinner 30
        // snack 15
        dailyCalorie.setBreakfastGoal(calorieIntakePerDay * (25/100));
        dailyCalorie.setBreakfastActual(0);

        dailyCalorie.setLunchGoal(calorieIntakePerDay * (30/100));
        dailyCalorie.setLunchActual(0);

        dailyCalorie.setDinnerGoal(calorieIntakePerDay * (30/100));
        dailyCalorie.setDinnerActual(0);

        dailyCalorie.setSnackGoal(calorieIntakePerDay * (15/100));
        dailyCalorie.setSnackActual(0);

        dailyCalorie.setDailyGoal(calorieIntakePerDay);
        dailyCalorie.setDailyActual(0);
    }

    public DailyCalorieResponseDto getDailyCalorieResponse(GetDailyCalorieDto getDailyCalorieDto){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<DailyCalorie> optDailyCal = dailyCalorieRepository.findByDate(getDailyCalorieDto.getDate());
        DailyCalorie dailyCalorie;
        if(optDailyCal.isEmpty()){
            dailyCalorie = new DailyCalorie();



            return mapStructMapper.dailyCalorietoDailyCalorieResponseDto(dailyCalorie);
        }
        // get from db comparing date if not found create
        return new DailyCalorieResponseDto();
    }
}
