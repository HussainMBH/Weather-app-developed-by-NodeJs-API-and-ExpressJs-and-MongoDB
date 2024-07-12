const weatherApi = "/weather";
document.addEventListener("DOMContentLoaded", () => {
    const weatherForm = document.querySelector("#weather-form");
    const emailInput = document.querySelector("#email-input");
    const cityInput = document.querySelector("#city-input");
    const weatherIcon = document.querySelector(".weatherIcon i");
    const weatherCondition = document.querySelector("#weatherCondition");
    const tempElement = document.querySelector("#temperature span");
    const locationElement = document.querySelector("#place");
    const dateElement = document.querySelector("#date");
    const emailDisplay = document.querySelector("#email-display");

    const currentDate = new Date();
    const options = { month: "long" };
    const monthName = currentDate.toLocaleString("en-US", options);
    dateElement.textContent = new Date().getDate() + " " + monthName;

    weatherForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const city = cityInput.value.trim();

        if (!email || !city) {
            alert('Please provide both email and city name');
            return;
        }

        locationElement.textContent = "Loading...";
        weatherIcon.className = "";
        tempElement.textContent = "";
        weatherCondition.textContent = "";
        emailDisplay.textContent = email; // Set the email display

        fetchWeatherData(city, email);
    });

    function fetchWeatherData(city, email) {
        fetch(`/weather?address=${encodeURIComponent(city)}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    displayWeatherData(data, city, email);
                    storeWeatherData(data, city, email);
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                locationElement.textContent = "Error fetching weather data.";
            });
    }

    function displayWeatherData(data, city, email) {
        const description = data.weather[0].description;

        if (description.includes("rain") || description.includes("fog")) {
            weatherIcon.className = "wi wi-day-" + description.replace(/\s/g, "-");
        } else {
            weatherIcon.className = "wi wi-day-cloudy";
        }

        locationElement.textContent = data.name;
        tempElement.textContent = (data.main.temp - 273.15).toFixed(2) + String.fromCharCode(176) + "C";
        weatherCondition.textContent = description.toUpperCase();
        emailDisplay.textContent = email;

        document.getElementById('weather-results').style.display = 'block';
    }

    function storeWeatherData(data, city, email) {
        const weatherData = {
            email: email,
            address: city,
            temperature: (data.main.temp - 273.15).toFixed(2),
            weatherCondition: data.weather[0].description,
            date: new Date().toISOString()
        };

        console.log("Data to be stored:", weatherData);

        fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(weatherData)
        }).then(response => response.json())
          .then(data => {
              if (data.error) {
                  alert('Failed to store data: ' + data.error);
              }
          })
          .catch(error => {
              console.error("Error storing weather data:", error);
          });
    }
});
