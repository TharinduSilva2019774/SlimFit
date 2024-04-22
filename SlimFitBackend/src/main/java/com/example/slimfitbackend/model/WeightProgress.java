package com.example.slimfitbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import java.util.Date;

@Entity
@Data
@EnableAutoConfiguration
@Table(name = "weight_progress")
public class WeightProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long weightProgressId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private double weight;

    private Date date;

}
