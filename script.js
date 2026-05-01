async function suggestCrop() {

    console.log("Button clicked");

    let location = document.getElementById("location").value.trim();
    let soil = document.getElementById("soil").value;
    let weather = document.getElementById("weather").value;

    let resultBox = document.getElementById("result");

    resultBox.innerHTML = "⏳ Loading...";

    // validation
    if (!location || !soil || !weather) {
        resultBox.innerHTML = "⚠ Please fill all fields";
        return;
    }

    try {
        // 🔥 Backend call (new)
        let response = await fetch(
          `http://localhost:8080/suggest?location=${location}&soil=${soil}&weather=${weather}`
        );

        let data = await response.json();

        // 🎯 Output
        resultBox.innerHTML = `
            🌾 <b>Crop:</b> ${data.crop} <br><br>
            🌡 <b>Temperature:</b> ${data.temperature} °C <br><br>
            💡 <b>Tip:</b> ${data.tip}
        `;
        console.log(data);
        console.log(resultBox);
        

    } catch (error) {
        resultBox.innerHTML = "⚠ Backend not working";
        console.log(error);
    }
}
function getLocation() {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async function(position) {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            console.log("Lat:", lat, "Lon:", lon);

            try {
                // 🔥 Reverse geocoding (convert lat/lon → city)
                let response = await fetch(
                    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=0f5968d750a6a5fee45c82d4bb1d1212`
                );

                let data = await response.json();

                if (data && data.length > 0) {
                    let city = data[0].name;
                    document.getElementById("location").value = city;
                } else {
                    alert("City not found");
                }

            } catch (error) {
                console.log(error);
                alert("Error fetching location");
            }

        },
        function(error) {
            alert("Location permission denied");
        }
    );
}
