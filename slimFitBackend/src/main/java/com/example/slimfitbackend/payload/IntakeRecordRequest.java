package com.example.slimfitbackend.payload;

import java.util.Date;

public class IntakeRecordRequest {

    private Date date;

    private long calorieCount;

    private String mealName;

    private String note;

    private long meal;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getCalorieCount() {
        return calorieCount;
    }

    public void setCalorieCount(long calorieCount) {
        this.calorieCount = calorieCount;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public long getMeal() {
        return meal;
    }

    public void setMeal(long meal) {
        this.meal = meal;
    }
}
