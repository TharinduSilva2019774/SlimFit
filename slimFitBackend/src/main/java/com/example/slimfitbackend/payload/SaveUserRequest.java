package com.example.slimfitbackend.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SaveUserRequest {

    private String email;

    private String firstName;

    private String lastName;

    private int age;

    private Date dateOfBirth;

    private double height;

    private double weight;

    private int gender;

    private int weeklyWeightLossGoal;

    private int dailyActivityGoal;

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
