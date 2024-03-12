package com.example.slimfitbackend.payload.common;

import com.example.slimfitbackend.model.DailyCalorie;
import com.example.slimfitbackend.model.User;
import com.example.slimfitbackend.payload.SaveUserRequest;
import com.example.slimfitbackend.payload.DailyCalorieResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    DailyCalorieResponseDto dailyCalorietoDailyCalorieResponseDto(DailyCalorie dailyCalorie);

    User createUserRequestToUser(SaveUserRequest saveUserRequest);

}
