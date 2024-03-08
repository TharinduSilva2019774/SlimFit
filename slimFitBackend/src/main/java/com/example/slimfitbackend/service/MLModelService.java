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

    public static double getCalorie(){
        Map<String, Double> values = new HashMap<>();
        values.put("Gender", 1.0);
        values.put("Age", 19.0);
        values.put("Height", 170.0);
        values.put("Weight", 63.0);
        values.put("Duration", 19.0);
        values.put("Exercise_type_num", 32.0);
        values.put("Intensity", 1.0);
        return (double) getRegressionValue(values);
    }
}
