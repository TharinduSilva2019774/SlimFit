package com.example.slimfitbackend.payload;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import java.util.Date;

@Getter
@Setter
public class GetDailyCalorieDto {

    @Nullable
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date date;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
