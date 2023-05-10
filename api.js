// require("dotenv").config();
const API_KEY = proccess.env.API_KEY;

let LAT, LON;
const UNITS = "metric";
const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);

url.searchParams.set("units", UNITS);
url.searchParams.set("appid", API_KEY);

// getting location
const weatherBlock = document.getElementById("weather");
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      url.searchParams.set("lat", position.coords.latitude);
      url.searchParams.set("lon", position.coords.longitude);
      loadWeather();
    });
  }
};

getLocation();

const loadWeather = async () => {
  const response = await fetch(url);
  const rdata = await response.json();
  if (response.ok) {
    getWeather(rdata);
  } else {
    console.log(response.message);
  }
  console.log(rdata);
};

const getWeather = (data) => {
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `
    <div class="weather__header">
      <div class="weather__main">
        <div class="weather__city">${location}</div>
        <div class="weather__status">${weatherStatus}</div>
      </div>
      <div class="weather__icon">
        <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}" />
      </div>
      <div class="weather__temp">${temp}℃</div>
      <div class="weather__feels-like">Feels like: ${feelsLike}℃</div>
    </div>
  `;
  weatherBlock.innerHTML = template;
};
