package com.example.slimfitbackend.service;

import org.pmml4s.model.Model;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class MLModelService {
    private static final Model model = Model.fromFile("./src/main/resources/models/linear_regression_model.pmml");

    private static Object getRegressionValue(Map<String, Double> values) {
        Object[] valuesMap = Arrays.stream(model.inputNames())
                .map(values::get)
                .toArray();

        Object[] result = model.predict(valuesMap);
        return result[0];
    }

    public static double getCalorie(double gender, double age, double height, double weight, double duration, double exercise_type_num, double intensity) {
        Map<String, Double> values = new HashMap<>();
        values.put("Gender",gender);
        values.put("Age", age);
        values.put("Height", height);
        values.put("Weight", weight);
        values.put("Duration", duration);
        values.put("Exercise_type_num", exercise_type_num);
        values.put("Intensity", intensity);
        return (double) getRegressionValue(values);
    }
}
