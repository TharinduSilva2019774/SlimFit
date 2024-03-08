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

    private Date date;

}
