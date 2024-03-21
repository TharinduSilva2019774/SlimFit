package com.example.slimfitbackend.service;

import com.example.slimfitbackend.payload.FoodCalResponse;
import com.example.slimfitbackend.payload.SearchFoodCalRequest;
import com.example.slimfitbackend.payload.SearchFoodCalResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONArray;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.util.ArrayList;

@Service
public class IntakeRecordService {

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

            foodCalResponses.add(new FoodCalResponse(hintFoodObject.getString("label"),hintNutrientsObject.getDouble("ENERC_KCAL")));
        }

        return new SearchFoodCalResponse(new FoodCalResponse(name, enercKcal),foodCalResponses);
    }

    public boolean saveNewIntakeRecord() {
        return true;
    }

}
