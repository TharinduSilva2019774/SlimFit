package com.example.slimfitbackend.payload;

import com.example.slimfitbackend.model.ActivityType;

import java.util.Date;

public class NewActivityRequest {

    private long activityType;

    private long calorie;

    private long duration;

    private long intensity;

    private Date date;

    public long getActivityType() {
        return activityType;
    }

    public void setActivityType(long activityType) {
        this.activityType = activityType;
    }

    public long getCalorie() {
        return calorie;
    }

    public void setCalorie(long calorie) {
        this.calorie = calorie;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public long getIntensity() {
        return intensity;
    }

    public void setIntensity(long intensity) {
        this.intensity = intensity;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
