function suggestCrop() {

    let location = document.getElementById("location").value.toLowerCase().trim();
    let soil = document.getElementById("soil").value;
    let weather = document.getElementById("weather").value;

    let resultBox = document.getElementById("result");

    // 🔄 Loading effect
    resultBox.innerHTML = "⏳ Analyzing conditions...";

    // ⛔ Validation
    if (!soil || !weather) {
        resultBox.innerHTML = "⚠ Please select soil type and weather";
        return;
    }

    let crop = "";
    let tip = "";
    let risk = "";

    // 🌾 Smart Logic
    if (soil === "clay" && weather === "rainy") {
        crop = "Rice";
        tip = "Clay soil retains water well";
        risk = "Avoid over-irrigation";
    } 
    else if (soil === "loamy" && weather === "cold") {
        crop = "Wheat";
        tip = "Loamy soil is nutrient-rich";
        risk = "Protect from frost";
    } 
    else if (soil === "sandy" && weather === "hot") {
        crop = "Maize";
        tip = "Good drainage in sandy soil";
        risk = "Water frequently";
    } 
    else {
        crop = "Mixed Crops";
        tip = "Balanced farming recommended";
        risk = "Monitor soil moisture regularly";
    }

    // 🌍 Location-based extra tip
    if (location.includes("bihar")) {
        tip += " | Suitable for eastern region";
    } else if (location.includes("punjab")) {
        tip += " | Suitable for northern region";
    }

    // 🎯 Final Output
    resultBox.innerHTML = `
        🌾 <b>Recommended Crop:</b> ${crop} <br><br>
        💡 <b>Tip:</b> ${tip} <br><br>
        ⚠ <b>Risk:</b> ${risk}
    `;
}


// 📍 Auto Location Button (Demo purpose)
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById("location").value = "Auto Detected";
        });
    } else {
        alert("Geolocation not supported");
    }
}