package com.example.slimfitbackend.payload;

public class FoodCalResponse {

    private String foodName;
    private double cal;

    public FoodCalResponse(String foodName, double cal) {
        this.foodName = foodName;
        this.cal = cal;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public double getCal() {
        return cal;
    }

    public void setCal(double cal) {
        this.cal = cal;
    }
}
