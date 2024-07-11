var weatherApi = "/weather";
const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

const currentDate = new Date();
const options = { month: "long" };
const monthName = currentDate.toLocaleString("en-US", options);
dateElement.textContent = new Date().getDate() + " " + monthName;

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    locationElement.textContent = "Loading...";
    weatherIcon.className = "";
    tempElement.textContent = "";
    weatherCondition.textContent = "";

    showData(cityInput.value.trim());
});

if ("geolocation" in navigator) {
    locationElement.textContent = "Loading...";
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.address) {
                        const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
                        if (city) {
                            showData(city);
                        } else {
                            console.error("City not found in location data.");
                            locationElement.textContent = "City not found.";
                        }
                    } else {
                        console.error("City not found in location data.");
                        locationElement.textContent = "City not found.";
                    }
                })
                .catch((error) => {
                    console.error("Error fetching location data:", error);
                    locationElement.textContent = "Error fetching location data.";
                });
        },
        function (error) {
            console.error("Error getting location:", error.message);
            locationElement.textContent = "Error getting location.";
        }
    );
} else {
    console.error("Geolocation is not available in this browser.");
    locationElement.textContent = "Geolocation not available.";
}

function showData(city) {
    getWeatherData(city, (result) => {
        console.log(result);
        if (result.cod == 200) {
            const description = result.weather[0].description;
            if (description.includes("rain") || description.includes("fog")) {
                weatherIcon.className = "wi wi-day-" + description.replace(/\s/g, "-");
            } else {
                weatherIcon.className = "wi wi-day-cloudy";
            }
            locationElement.textContent = result.name;
            tempElement.textContent = (result.main.temp - 273.15).toFixed(2) + String.fromCharCode(176) + "C";
            weatherCondition.textContent = description.toUpperCase();
        } else {
            locationElement.textContent = "City not found.";
        }
    });
}

function getWeatherData(city, callback) {
    const locationApi = `${weatherApi}?address=${encodeURIComponent(city)}`;
    fetch(locationApi)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            locationElement.textContent = "Error fetching weather data.";
        });
}
