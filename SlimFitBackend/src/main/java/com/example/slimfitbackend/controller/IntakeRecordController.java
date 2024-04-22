package com.example.slimfitbackend.controller;

import com.example.slimfitbackend.payload.IntakeRecordRequest;
import com.example.slimfitbackend.payload.IntakeRecordResponse;
import com.example.slimfitbackend.payload.NewActivityRequest;
import com.example.slimfitbackend.payload.NewActivityResponse;
import com.example.slimfitbackend.service.IntakeRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/record")
public class IntakeRecordController {

    @Autowired
    private IntakeRecordService intakeRecordService;

    @PostMapping("/newRecord")
    public IntakeRecordResponse addNewRecord(@RequestBody IntakeRecordRequest intakeRecordRequest) throws Exception {
        return intakeRecordService.saveNewIntakeRecord(intakeRecordRequest);
    }

}
