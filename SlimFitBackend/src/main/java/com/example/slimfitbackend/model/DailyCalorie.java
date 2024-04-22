package com.example.slimfitbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@EnableAutoConfiguration
@Table(name = "daily_calorie")
public class DailyCalorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dailyCalorieId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "dailyCalorie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<IntakeRecord> intakeRecords = new ArrayList<>();

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

    private long dailyActivityGoal;

    private long dailyActivityActual;

    private Date date;

    public long getDailyActivityGoal() {
        return dailyActivityGoal;
    }

    public void setDailyActivityGoal(long dailyActivityGoal) {
        this.dailyActivityGoal = dailyActivityGoal;
    }

    public long getDailyActivityActual() {
        return dailyActivityActual;
    }

    public void setDailyActivityActual(long dailyActivityActual) {
        this.dailyActivityActual = dailyActivityActual;
    }

    public long getDailyCalorieId() {
        return dailyCalorieId;
    }

    public void setDailyCalorieId(long dailyCalorieId) {
        this.dailyCalorieId = dailyCalorieId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<IntakeRecord> getIntakeRecords() {
        return intakeRecords;
    }

    public void setIntakeRecords(List<IntakeRecord> intakeRecords) {
        this.intakeRecords = intakeRecords;
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
