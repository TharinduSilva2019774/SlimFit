package com.example.slimfitbackend.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class GetActivitiesResponse {

    private String label;
    private long value;

    public GetActivitiesResponse(String label, long value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public long getValue() {
        return value;
    }

    public void setValue(long value) {
        this.value = value;
    }
}
