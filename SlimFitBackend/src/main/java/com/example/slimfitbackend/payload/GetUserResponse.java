package com.example.slimfitbackend.payload;

import java.util.Date;

public class GetUserResponse {

    private Long userId;

    private String email;

    private String firstName;

    private String lastName;

    private int age;

    private Date dateOfBirth;

    private double height;

    private double weight;

    private int gender;

    private double bmr;

    private int weeklyWeightLossGoal;

    private int dailyActivityGoal;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public double getBmr() {
        return bmr;
    }

    public void setBmr(double bmr) {
        this.bmr = bmr;
    }

    public int getWeeklyWeightLossGoal() {
        return weeklyWeightLossGoal;
    }

    public void setWeeklyWeightLossGoal(int weeklyWeightLossGoal) {
        this.weeklyWeightLossGoal = weeklyWeightLossGoal;
    }

    public int getDailyActivityGoal() {
        return dailyActivityGoal;
    }

    public void setDailyActivityGoal(int dailyActivityGoal) {
        this.dailyActivityGoal = dailyActivityGoal;
    }
}
