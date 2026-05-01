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

    navigator.geolocation.getCurrentPosition(function(position) {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        console.log("Lat:", lat, "Lon:", lon);

        // backend ko send karo
        fetch(`http://localhost:8080/location?lat=${lat}&lon=${lon}`)
            .then(res => res.text())
            .then(city => {
                console.log("city: ",city);
                document.getElementById("location").value = city;
            })
            .catch(err => console.log(err));

    });
}