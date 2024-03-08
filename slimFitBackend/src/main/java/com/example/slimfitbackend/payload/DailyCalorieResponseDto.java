package com.example.slimfitbackend.payload;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DailyCalorieResponseDto {

    private long dailyCalorieId;

    private long breakfastGoal;

    private long breakfastActual;

    private long lunchGoal;

    private long lunchActual;

    private long dinnerGoal;

    private long dinnerActual;

    private long snackGoal;

    private long snackActual;

    private long dailyGoal;

    private long dailyActual;

    private Date date;

}
