// API Configuration
const apiKey = "YOUR_API_KEY";
const weatherInfo = document.getElementById("weatherInfo");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

// Fetch Weather Data
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error("City not found!");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Display Weather Data
function displayWeather(data) {
    document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("condition").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
}

// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});

// Fetch Weather for Current Location
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            () => alert("Location access denied! Enter city manually.")
        );
    }
});

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error("Location not found!");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert("Error: " + error.message);
    }
}
