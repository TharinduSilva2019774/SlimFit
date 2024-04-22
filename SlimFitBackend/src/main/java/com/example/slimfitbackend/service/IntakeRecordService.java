package com.example.slimfitbackend.service;

import com.example.slimfitbackend.model.DailyCalorie;
import com.example.slimfitbackend.model.IntakeRecord;
import com.example.slimfitbackend.model.User;
import com.example.slimfitbackend.payload.*;
import com.example.slimfitbackend.payload.common.MapStructMapper;
import com.example.slimfitbackend.repository.ActivityTypeRepository;
import com.example.slimfitbackend.repository.DailyCalorieRepository;
import com.example.slimfitbackend.repository.IntakeRecordRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class IntakeRecordService {

    @Autowired
    private DailyCalorieService dailyCalorieService;

    @Autowired
    private UserService userService;

    @Autowired
    private MapStructMapper mapStructMapper;

    @Autowired
    private IntakeRecordRepository intakeRecordRepository;

    public SearchFoodCalResponse getCalorieForFood(SearchFoodCalRequest searchFoodCalRequest) throws JsonProcessingException {
        String apiUrl = "https://api.edamam.com/api/food-database/parser?nutrition-type=logging&app_id=07d50733&app_key=80fcb49b500737827a9a23f7049653b9&ingr=" + searchFoodCalRequest.getFoodName();
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
        JSONObject json = new JSONObject(response);
        Object json1 = json.get("body");
        JSONObject body = new JSONObject(json1.toString());
        Object parsed = body.get("parsed");
        JSONArray jsonArray = new JSONArray(parsed.toString());
        JSONObject jsonObject = jsonArray.getJSONObject(0);
        JSONObject foodObject = jsonObject.getJSONObject("food");
        JSONObject nutrientsObject = foodObject.getJSONObject("nutrients");
        String name = foodObject.getString("label");
        double enercKcal = nutrientsObject.getDouble("ENERC_KCAL");

        Object hints = body.get("hints");
        JSONArray hintsJsonArray = new JSONArray(hints.toString());

        ArrayList<FoodCalResponse> foodCalResponses = new ArrayList<>();

        for (int i = 0; i < hintsJsonArray.length(); i++) {
            JSONObject hintJsonObject = hintsJsonArray.getJSONObject(0);
            JSONObject hintFoodObject = hintJsonObject.getJSONObject("food");
            JSONObject hintNutrientsObject = hintFoodObject.getJSONObject("nutrients");

            foodCalResponses.add(new FoodCalResponse(hintFoodObject.getString("label"), hintNutrientsObject.getDouble("ENERC_KCAL")));
        }

        return new SearchFoodCalResponse(new FoodCalResponse(name, enercKcal), foodCalResponses);
    }

    public IntakeRecordResponse saveNewIntakeRecord(IntakeRecordRequest intakeRecordRequest) throws Exception {

        IntakeRecord intakeRecord = new IntakeRecord();
        intakeRecord.setCalorieCount(intakeRecordRequest.getCalorieCount());
        intakeRecord.setMealName(intakeRecordRequest.getMealName());
        intakeRecord.setNote(intakeRecordRequest.getNote());
        User user = userService.getCurrentUser();
        DailyCalorie dailyCal = dailyCalorieService.getDailyCalorie(user, intakeRecordRequest.getDate());

        switch ((int) intakeRecordRequest.getMeal()) {
            case 1 ->
                    dailyCal.setBreakfastActual(dailyCal.getBreakfastActual() + intakeRecordRequest.getCalorieCount());
            case 2 -> dailyCal.setLunchActual(dailyCal.getLunchActual() + intakeRecordRequest.getCalorieCount());
            case 3 -> dailyCal.setDinnerActual(dailyCal.getDinnerActual() + intakeRecordRequest.getCalorieCount());
            case 4 -> dailyCal.setSnackActual(dailyCal.getSnackActual() + intakeRecordRequest.getCalorieCount());
            default -> {
            }
        }

        intakeRecord.setDailyCalorie(dailyCal);
        intakeRecord = intakeRecordRepository.save(intakeRecord);
        return mapStructMapper.itakeRecordToIntakeRecordResponse(intakeRecord);
    }

}
