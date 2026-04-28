async function suggestCrop() {
    console.log("Button clicked");

    let location = document.getElementById("location").value.trim();
    let soil = document.getElementById("soil").value;
    let weather = document.getElementById("weather").value;

    let resultBox = document.getElementById("result");

    resultBox.innerHTML = "⏳ Analyzing conditions...";

    if (!soil || !weather) {
        resultBox.innerHTML = "⚠ Please select soil and weather";
        return;
    }

    let crop = "";
    let tip = "";
    let risk = "";
    let tempText = "Not available";

    // 🌦 Weather API
    try {
        let apiKey = "33599ef4b104531f6a122239dc07a835";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${location},IN&appid=${apiKey}&units=metric`;

        let response = await fetch(url);
        let data = await response.json();

        console.log(data);

        if (data.cod === 200 && data.main) {
            tempText = data.main.temp + "°C";
        }

    } catch (error) {
        console.log("Weather API error:", error);
    }

    // 🌾 Backend API
    try {
        let response = await fetch(
            `http://localhost:8080/suggest?soil=${soil}&weather=${weather}`
        );

        let data = await response.json();

        crop = data.crop;
        tip = data.tip;

    } catch (error) {
        resultBox.innerHTML = "⚠ Backend not working";
        console.log("Backend error:", error);
        return;
    }

    // 🎯 Output
    resultBox.innerHTML = `
        🌾 <b>Crop:</b> ${crop} <br><br>
        🌡 <b>Temperature:</b> ${tempText} <br><br>
        💡 <b>Tip:</b> ${tip}
    `;
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            console.log(lat, lon);

            let apiKey = "33599ef4b104531f6a122239dc07a835";
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            let response = await fetch(url);
            let data = await response.json();

            if (data.name) {
                document.getElementById("location").value = data.name;
            }

        });
    } else {
        alert("Geolocation not supported");
    }
}