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
}
