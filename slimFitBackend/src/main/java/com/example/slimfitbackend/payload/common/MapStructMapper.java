package com.example.slimfitbackend.payload.common;

import com.example.slimfitbackend.model.*;
import com.example.slimfitbackend.payload.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    DailyCalorieResponseDto dailyCalorietoDailyCalorieResponseDto(DailyCalorie dailyCalorie);

    User createUserRequestToUser(SaveUserRequest saveUserRequest);

    NewActivityResponse userActivityToNewActivityResponse(UserActivity userActivity);

    IntakeRecordResponse itakeRecordToIntakeRecordResponse(IntakeRecord intakeRecord);

    @Mapping(target = "username", ignore = true)
    MessageResponse messageToMessageResponse(Message messages);

    GetUserResponse userToGetUserResponse(User user);

}
