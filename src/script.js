let date = new Date();
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let month = date.getMonth() + 1;
if (month < 10) {
  month = `0${month}`;
}
let year = date.getFullYear();
let dayNumber = date.getDate();
if (dayNumber < 10) {
  dayNumber = `0${dayNumber}`;
}
let cifDay = date.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[cifDay];

let currentDay = document.querySelector("#day");
currentDay.innerHTML = `${day}, ${dayNumber}.${month}.${year}`;
let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${hours}:${minutes}`;

function formatDay(times) {
  let date = new Date(times * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function fullDayNumber(times) {
  let date = new Date(times * 1000);
  let fullDayNum = `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;
  return fullDayNum;
}

function showForecast(responce) {
  let forecast = responce.data.daily;
  let forecastElement = document.querySelector("#forecast-weather");
  let forecastHTML = "";

  forecast.forEach((forecastDay, index) => {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
            <p class = "forecast-day">${formatDay(forecastDay.time)}</h3>

            <p class="small"><small>${fullDayNumber(
              forecastDay.time
            )}</small></p>

            <p class="emoji">  <img src="${
              forecastDay.condition.icon_url
            }" width="50px" alt="${forecastDay.condition.description}" /></p>
            ${Math.round(forecastDay.temperature.minimum)}/${Math.round(
          forecastDay.temperature.maximum
        )}
          </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;

  document.querySelector("#minMax").innerHTML = `Min/Max temp ( ${Math.round(
    forecast[0].temperature.maximum
  )} ℃/ ${Math.round(forecast[0].temperature.minimum)} ℃)`;
}

function getForecast(query) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTempereture(responce) {
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  let cityHTML = document.querySelector("#city");
  cityHTML.innerHTML = responce.data.city;
  let temeratureElement = document.querySelector("#temperature");
  temeratureElement.innerHTML = Math.round(responce.data.temperature.current);

  celsiusTemperature = responce.data.temperature.current;

  document.querySelector("#wind").innerHTML = Math.round(
    responce.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    responce.data.temperature.humidity
  );
  document.querySelector("#discription").innerHTML =
    responce.data.condition.description;
  document
    .querySelector("#icon")
    .setAttribute("src", responce.data.condition.icon_url);
  document
    .querySelector("#icon")
    .setAttribute("alt", responce.data.condition.description);
  getForecast(responce.data.city);
}

function search(city) {
  let apiKey = "3ba49e901d0tof3a381ffd812a82fa2e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempereture);
}

function saerchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input").value;
  search(inputCity);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "3ba49e901d0tof3a381ffd812a82fa2e";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(url).then(showTempereture);
}

function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let current = document.querySelector("#currentWeather");
current.addEventListener("click", handlePosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", saerchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
function fahrenheitTemperetare(event) {
  event.preventDefault;
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temeratureElement = document.querySelector("#temperature");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  temeratureElement.innerHTML = fahrenheitTemp;
}
fahrenheitLink.addEventListener("click", fahrenheitTemperetare);
let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius-link");
function celsius(event) {
  event.preventDefault;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temeratureElement = document.querySelector("#temperature");
  temeratureElement.innerHTML = Math.round(celsiusTemperature);
}
celsiusLink.addEventListener("click", celsius);

search("Amsterdam");

