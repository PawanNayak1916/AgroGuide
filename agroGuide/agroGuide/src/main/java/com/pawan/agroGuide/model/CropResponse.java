package com.pawan.agroGuide.model;

public class CropResponse {

    private String crop;
    private String tip;
    private double temperature;

    public CropResponse(String crop, String tip, double temperature) {
        this.crop = crop;
        this.tip = tip;
        this.temperature = temperature;
    }

    public String getCrop() {
        return crop;
    }

    public String getTip() {
        return tip;
    }
    public double getTemperature(){
        return temperature;
    }
}