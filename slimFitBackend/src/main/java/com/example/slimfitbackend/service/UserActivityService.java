package com.example.slimfitbackend.service;

import com.example.slimfitbackend.model.ActivityType;
import com.example.slimfitbackend.model.DailyCalorie;
import com.example.slimfitbackend.model.User;
import com.example.slimfitbackend.model.UserActivity;
import com.example.slimfitbackend.payload.NewActivityRequest;
import com.example.slimfitbackend.payload.NewActivityResponse;
import com.example.slimfitbackend.payload.common.MapStructMapper;
import com.example.slimfitbackend.repository.ActivityTypeRepository;
import com.example.slimfitbackend.repository.DailyCalorieRepository;
import com.example.slimfitbackend.repository.UserActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserActivityService {

    @Autowired
    private UserService userService;

    @Autowired
    private DailyCalorieRepository dailyCalorieRepository;

    @Autowired
    private ActivityTypeRepository activityTypeRepository;

    @Autowired
    private DailyCalorieService dailyCalorieService;

    @Autowired
    private UserActivityRepository userActivityRepository;

    @Autowired
    private MapStructMapper mapStructMapper;

    public NewActivityResponse addNewActivity(NewActivityRequest newActivityRequest) throws Exception {
        UserActivity userActivity = new UserActivity();
        User user = userService.getCurrentUser();
        userActivity.setUser(user);
        userActivity.setDate(newActivityRequest.getDate());
        userActivity.setIntensity(newActivityRequest.getIntensity());
        userActivity.setCalorie(newActivityRequest.getCalorie());
        userActivity.setDuration(newActivityRequest.getDuration());
        Optional<ActivityType> activityType = activityTypeRepository.findById(newActivityRequest.getActivityType());
        activityType.ifPresent(userActivity::setActivityType);
        userActivityRepository.save(userActivity);

        Optional<DailyCalorie> dailyOpt = dailyCalorieRepository.findByDateAndUser(newActivityRequest.getDate(), user);
        DailyCalorie daily;
        daily = dailyOpt.orElseGet(() -> dailyCalorieService.createNewDailyCalorie(user, newActivityRequest.getDate()));
        daily.setDailyActivityActual(daily.getDailyActivityActual() + newActivityRequest.getCalorie());
        daily.setDailyActual(daily.getDailyActual() + newActivityRequest.getCalorie());
        dailyCalorieRepository.save(daily);

        return mapStructMapper.userActivityToNewActivityResponse(userActivity);
    }
}
