package com.example.slimfitbackend.payload;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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

    public long getDailyCalorieId() {
        return dailyCalorieId;
    }

    public void setDailyCalorieId(long dailyCalorieId) {
        this.dailyCalorieId = dailyCalorieId;
    }

    public long getBreakfastGoal() {
        return breakfastGoal;
    }

    public void setBreakfastGoal(long breakfastGoal) {
        this.breakfastGoal = breakfastGoal;
    }

    public long getBreakfastActual() {
        return breakfastActual;
    }

    public void setBreakfastActual(long breakfastActual) {
        this.breakfastActual = breakfastActual;
    }

    public long getLunchGoal() {
        return lunchGoal;
    }

    public void setLunchGoal(long lunchGoal) {
        this.lunchGoal = lunchGoal;
    }

    public long getLunchActual() {
        return lunchActual;
    }

    public void setLunchActual(long lunchActual) {
        this.lunchActual = lunchActual;
    }

    public long getDinnerGoal() {
        return dinnerGoal;
    }

    public void setDinnerGoal(long dinnerGoal) {
        this.dinnerGoal = dinnerGoal;
    }

    public long getDinnerActual() {
        return dinnerActual;
    }

    public void setDinnerActual(long dinnerActual) {
        this.dinnerActual = dinnerActual;
    }

    public long getSnackGoal() {
        return snackGoal;
    }

    public void setSnackGoal(long snackGoal) {
        this.snackGoal = snackGoal;
    }

    public long getSnackActual() {
        return snackActual;
    }

    public void setSnackActual(long snackActual) {
        this.snackActual = snackActual;
    }

    public long getDailyGoal() {
        return dailyGoal;
    }

    public void setDailyGoal(long dailyGoal) {
        this.dailyGoal = dailyGoal;
    }

    public long getDailyActual() {
        return dailyActual;
    }

    public void setDailyActual(long dailyActual) {
        this.dailyActual = dailyActual;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
