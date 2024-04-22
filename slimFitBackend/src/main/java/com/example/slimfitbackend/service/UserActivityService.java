package com.example.slimfitbackend.service;

import com.example.slimfitbackend.model.ActivityType;
import com.example.slimfitbackend.model.DailyCalorie;
import com.example.slimfitbackend.model.User;
import com.example.slimfitbackend.model.UserActivity;
import com.example.slimfitbackend.payload.*;
import com.example.slimfitbackend.payload.NewActivityRequest;
import com.example.slimfitbackend.payload.NewActivityResponse;
import com.example.slimfitbackend.payload.PredictCalorieRequest;
import com.example.slimfitbackend.payload.PredictCalorieResponse;
import com.example.slimfitbackend.payload.common.MapStructMapper;
import com.example.slimfitbackend.repository.ActivityTypeRepository;
import com.example.slimfitbackend.repository.DailyCalorieRepository;
import com.example.slimfitbackend.repository.UserActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

        DailyCalorie daily = dailyCalorieService.getDailyCalorie(user,newActivityRequest.getDate());
        daily.setDailyActivityActual(daily.getDailyActivityActual() + newActivityRequest.getCalorie());
        daily.setDailyActual(daily.getDailyActual() + newActivityRequest.getCalorie());
        dailyCalorieRepository.save(daily);

        return mapStructMapper.userActivityToNewActivityResponse(userActivity);
    }

    public PredictCalorieResponse getPredictedCalForAct(PredictCalorieRequest predictCalorieRequest) throws Exception {
        User user = userService.getCurrentUser();
        double results = MLModelService.getCalorie(user.getGender(), user.getAge(), user.getHeight(), user.getWeight(), predictCalorieRequest.getDuration(), predictCalorieRequest.getActId(), predictCalorieRequest.getIntensity());
        PredictCalorieResponse predictCalorieResponse = new PredictCalorieResponse();
        predictCalorieResponse.setCalorie(results);
        return predictCalorieResponse;
    }

    public List<GetActivitiesResponse> getActivities(){
        List<ActivityType> activities = activityTypeRepository.findAll();
        List<GetActivitiesResponse> getActivitiesResponseList = new ArrayList<>();
        for (ActivityType activity : activities) {
            getActivitiesResponseList.add(new GetActivitiesResponse(activity.getName(),activity.getActId()));
        }
        return getActivitiesResponseList;
    }
}
