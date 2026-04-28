package com.pawan.agroGuide.controller;

import com.pawan.agroGuide.model.CropResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class CropController {

    @GetMapping("/suggest")
    public CropResponse suggestCrop(
            @RequestParam String soil,
            @RequestParam String weather) {

        String crop;
        String tip;

        if (soil.equals("clay") && weather.equals("rainy")) {
            crop = "Rice";
            tip = "Best for water-rich conditions";
        } else if (soil.equals("loamy") && weather.equals("cold")) {
            crop = "Wheat";
            tip = "Good for cool climate";
        } else if (soil.equals("sandy") && weather.equals("hot")) {
            crop = "Maize";
            tip = "Suitable for dry soil";
        } else {
            crop = "Mixed Crops";
            tip = "Balanced farming recommended";
        }

        return new CropResponse(crop, tip);
    }
}