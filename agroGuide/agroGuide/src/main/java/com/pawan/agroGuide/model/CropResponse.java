package com.pawan.agroGuide.model;

public class CropResponse {

    private String crop;
    private String tip;

    public CropResponse(String crop, String tip) {
        this.crop = crop;
        this.tip = tip;
    }

    public String getCrop() {
        return crop;
    }

    public String getTip() {
        return tip;
    }
}