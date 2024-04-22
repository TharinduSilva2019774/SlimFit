package com.example.slimfitbackend.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class IntakeRecordResponse {

    private Date date;

    private long calorieCount;

    private String MealName;

    private String note;

    private long meal;

}
