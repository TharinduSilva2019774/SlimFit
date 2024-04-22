package com.example.slimfitbackend.repository;

import com.example.slimfitbackend.model.WeightProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightProgressRepository extends JpaRepository<WeightProgress, Long> {
}
