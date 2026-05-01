package com.pawan.agroGuide.controller;

import org.springframework.beans.factory.annotation.Value;
import com.pawan.agroGuide.model.CropResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CropController {

    @Value("${weather.api.key}")
    private String apiKey;

    @GetMapping("/suggest")
    public CropResponse suggestCrop(
            @RequestParam String location,
            @RequestParam String soil,
            @RequestParam String weather) {

        double temp = 0;

        try {
            String url = "https://api.openweathermap.org/data/2.5/weather?q="
                    + location + ",IN&appid=" + apiKey + "&units=metric";
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
    @GetMapping("/location")
    public String getCity(@RequestParam double lat, @RequestParam double lon) {

        try {
            String url = "https://api.openweathermap.org/geo/1.0/reverse?lat="
                    + lat + "&lon=" + lon + "&limit=1&appid=" + apiKey;

            RestTemplate restTemplate = new RestTemplate();

            List<Map<String, Object>> response =
                    restTemplate.getForObject(url, List.class);

            if (response != null && !response.isEmpty()) {

                Map<String, Object> locationData = response.get(0);

                // 🔥 correct field
                return locationData.get("name").toString();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Unknown";
    }
}