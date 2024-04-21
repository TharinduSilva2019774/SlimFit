package com.example.slimfitbackend.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PredictCalorieRequest {

    private int intensity;

    private Long actId;

    private long duration;

    public int getIntensity() {
        return intensity;
    }

    public void setIntensity(int intensity) {
        this.intensity = intensity;
    }

    public Long getActId() {
        return actId;
    }

    public void setActId(Long actId) {
        this.actId = actId;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }
}
