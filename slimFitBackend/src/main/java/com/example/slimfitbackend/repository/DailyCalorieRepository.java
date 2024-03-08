package com.example.slimfitbackend.repository;

import com.example.slimfitbackend.model.DailyCalorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface DailyCalorieRepository extends JpaRepository<DailyCalorie, Long> {

    Optional<DailyCalorie> findByDate(Date date);

}
