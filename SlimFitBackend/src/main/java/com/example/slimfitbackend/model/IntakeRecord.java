package com.example.slimfitbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@Entity
@Data
@EnableAutoConfiguration
@Table(name = "intake_record")
public class IntakeRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long IntakeRecordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "daily_calorie_id")
    private DailyCalorie dailyCalorie;

    private long calorieCount;

    private String MealName;

    private String note;

    private long meal;

    public long getIntakeRecordId() {
        return IntakeRecordId;
    }

    public void setIntakeRecordId(long intakeRecordId) {
        IntakeRecordId = intakeRecordId;
    }

    public DailyCalorie getDailyCalorie() {
        return dailyCalorie;
    }

    public void setDailyCalorie(DailyCalorie dailyCalorie) {
        this.dailyCalorie = dailyCalorie;
    }

    public long getCalorieCount() {
        return calorieCount;
    }

    public void setCalorieCount(long calorieCount) {
        this.calorieCount = calorieCount;
    }

    public String getMealName() {
        return MealName;
    }

    public void setMealName(String mealName) {
        MealName = mealName;
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
