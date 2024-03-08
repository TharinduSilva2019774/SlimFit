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
@Table(name = "\"user\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long userId;

    private String firstName;

    private String lastName;

    private int age;

    private Date dateOfBirth;

    private double height;

    private double weight;

    private int gender;

    private double bmr;

    private double weeklyWeightLossGoal;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserActivity> userActivities = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WeightProgress> weightProgresses = new ArrayList<>();

}
