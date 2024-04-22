package com.example.slimfitbackend.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PredictCalorieResponse {

    private double calorie;

    public double getCalorie() {
        return calorie;
    }

    public void setCalorie(double calorie) {
        this.calorie = calorie;
    }
}
