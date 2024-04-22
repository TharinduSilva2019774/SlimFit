package com.example.slimfitbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@EnableAutoConfiguration
@Table(name = "activity_type")
public class ActivityType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long actId;

    private String name;

    @OneToMany(mappedBy = "activityType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserActivity> userActivities = new ArrayList<>();

    public void setActId(Long actId) {
        this.actId = actId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getActId() {
        return actId;
    }

    public String getName() {
        return name;
    }
}
