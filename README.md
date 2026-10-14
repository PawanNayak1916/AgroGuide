# 🌱 AgroGuide – Smart Crop Suggestion System

AgroGuide is a smart crop suggestion web application designed to help users explore suitable crops based on location, soil type, and weather conditions.

The project uses a Java Spring Boot backend and an HTML, CSS, and JavaScript frontend to provide crop suggestions and display relevant weather information.

## ✨ Features

- 🌾 **Crop Suggestions:** Suggests crops based on user-provided soil and weather conditions.
- 📍 **Location Input:** Allows users to enter their location.
- 🌡️ **Weather Information:** Retrieves temperature information through the configured weather API.
- 💡 **Farming Tips:** Displays a simple tip alongside the crop suggestion.
- 🖥️ **Web Interface:** Provides a simple interface for entering information and viewing results.

## 🛠️ Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Java
- Spring Boot
- Maven

**API**
- OpenWeather API

## ⚙️ How It Works

1. The user enters a location.
2. The user selects or enters soil and weather conditions.
3. The frontend sends a request to the Spring Boot backend.
4. The backend processes the input and retrieves weather information where configured.
5. The application returns a crop suggestion, temperature, and farming tip.
6. The frontend displays the result to the user.

## 🚀 Getting Started

### Prerequisites

- Java and Maven installed
- A web browser
- An OpenWeather API key, if required by the backend configuration

### Run the Backend

1. Open the project in your IDE.
2. Navigate to the backend directory containing `pom.xml`.
3. Configure the required API key securely.
4. Run the Spring Boot application.

You can also start it from the backend directory using:

```bash
mvn spring-boot:run
```

The application commonly runs on `http://localhost:8080`, depending on its configuration.

### Run the Frontend

1. Open the frontend folder.
2. Open `index.html` in your browser or use a local development server.
3. Ensure the JavaScript API URL matches the running backend address.

## 🔗 API Endpoint

The crop suggestion endpoint used by the frontend is:

```http
GET /suggest?location=<location>&soil=<soil>&weather=<weather>
```

Example:

```text
http://localhost:8080/suggest?location=Bokaro&soil=Loamy&weather=Sunny
```

The accepted values depend on the current backend implementation.

## 🔮 Future Enhancements

- Improve crop recommendations using region-specific agricultural data.
- Add more detailed weather-based suggestions.
- Improve error handling and input validation.
- Enhance the responsive user interface.
- Deploy the application for public access.

## 👨‍💻 Author

**Pawan Kumar Nayak**

## 📌 Disclaimer

AgroGuide is an educational prototype. Crop recommendations are based on simplified logic and should be verified with local agricultural experts before making farming decisions.
