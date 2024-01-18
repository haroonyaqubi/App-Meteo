      // Use const for constant variables
const apikey = "37f7ccbd2a7b1db1a34e1840e5db9123";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorContainer = document.querySelector(".error");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");

async function checkWeather(city) {
    loader.style.display = "block";
    errorContainer.style.display = "none";

    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);

        if (response.status == 404) {
            errorMessage.innerHTML = "City not found. Please enter a valid city name.";
            errorContainer.style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            var data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            const weatherMain = data.weather[0].main.toLowerCase();
            weatherIcon.src = `images/${weatherMain}.png`;

            document.querySelector(".weather").style.display = "block";
            errorContainer.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    } finally {
        loader.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
