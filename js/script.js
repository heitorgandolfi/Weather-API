// Variáveis e seleção de eventos

const apiKey = "a49eafce0a283195b672d91653a9ccf5";
const apiCountryUrl = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const weatherDisplay = document.querySelector("#weather-data");

const cityElement = document.querySelector("#city");
const countryElement = document.querySelector("#country");
const tempElement = document.querySelector("#temperature span");
const minTempElement = document.querySelector("#temperature-min span");
const maxTempElement = document.querySelector("#temperature-max span");
const feelsLikeElement = document.querySelector("#feels-like span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

// Funções

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

const showWeatherData = async (city) => {
    weatherDisplay.setAttribute('aria-busy', 'true');
    const data = await getWeatherData(city);

    if (!data.name) {
        alert("Cidade não localizada.");
        window.location.reload();
    } else {
        cityElement.innerText = data.name;
        countryElement.src = apiCountryUrl + `${data.sys.country}`;
        tempElement.innerText = parseInt(data.main.temp);
        maxTempElement.innerText = parseInt(data.main.temp_max);
        minTempElement.innerText = parseInt(data.main.temp_min);
        feelsLikeElement.innerText = parseInt(data.main.feels_like);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed} km/h`;

        weatherDisplay.classList.remove("hide");
        weatherDisplay.setAttribute('aria-busy', 'false');
    }
    cityInput.value = "";
    cityInput.focus();
}

// Eventos

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})