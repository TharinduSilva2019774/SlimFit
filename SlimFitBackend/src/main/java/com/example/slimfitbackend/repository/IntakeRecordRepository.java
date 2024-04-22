package com.example.slimfitbackend.repository;

import com.example.slimfitbackend.model.IntakeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntakeRecordRepository extends JpaRepository<IntakeRecord, Long> {
}
