package com.pawan.agroGuide.controller;

import com.pawan.agroGuide.model.CropResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class CropController {

    private final String API_KEY = "0f5968d750a6a5fee45c82d4bb1d1212";

    @GetMapping("/suggest")
    public CropResponse suggestCrop(
            @RequestParam String location,
            @RequestParam String soil,
            @RequestParam String weather) {

        double temp = 0;

        try {
            String url = "https://api.openweathermap.org/data/2.5/weather?q="
                    + location + ",IN&appid=" + API_KEY + "&units=metric";
            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null && response.containsKey("main")) {
                Map<String, Object> main = (Map<String, Object>) response.get("main");

                Object tempObj = main.get("temp");

                if (tempObj != null) {
                    temp = Double.parseDouble(tempObj.toString());
                }
            }

            System.out.println("Temperature: " + temp);

        } catch (Exception e) {
            System.out.println("Weather API failed");
            e.printStackTrace();
        }

        String crop;
        String tip;

        if (soil.equals("clay") && weather.equals("rainy") && temp >= 25 && temp <= 35) {
            crop = "Rice";
            tip = "Suitable for warm and wet conditions";
        } else if (soil.equals("loamy") && weather.equals("cold") && temp < 25) {
            crop = "Wheat";
            tip = "Best for cool climate";
        } else if (soil.equals("sandy") && weather.equals("hot") && temp > 30) {
            crop = "Maize";
            tip = "Good for dry and hot conditions";
        } else {
            crop = "Mixed Crops";
            tip = "Try multiple crops";
        }

        return new CropResponse(crop, tip, temp);
    }
}