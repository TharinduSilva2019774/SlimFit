package com.example.slimfitbackend.payload;

import java.util.List;

public class SearchFoodCalResponse {

    private FoodCalResponse matchFood;

    private List<FoodCalResponse> hintedFoods;

    public SearchFoodCalResponse(FoodCalResponse matchFood, List<FoodCalResponse> hintedFoods) {
        this.matchFood = matchFood;
        this.hintedFoods = hintedFoods;
    }

    public FoodCalResponse getMatchFood() {
        return matchFood;
    }

    public void setMatchFood(FoodCalResponse matchFood) {
        this.matchFood = matchFood;
    }

    public List<FoodCalResponse> getHintedFoods() {
        return hintedFoods;
    }

    public void setHintedFoods(List<FoodCalResponse> hintedFoods) {
        this.hintedFoods = hintedFoods;
    }
}
