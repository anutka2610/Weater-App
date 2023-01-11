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

function showTempereture(responce) {
  console.log(responce.data);
  let cityHTML = document.querySelector("#city");
  cityHTML.innerHTML = responce.data.name;
  let temeratureElement = document.querySelector("#temperature");
  temeratureElement.innerHTML = Math.round(responce.data.main.temp);
  document.querySelector("#tempMax").innerHTML = responce.data.main.temp_max;
  document.querySelector("#tempMin").innerHTML = responce.data.main.temp_min;
  document.querySelector("#wind").innerHTML = Math.round(
    responce.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    responce.data.main.humidity
  );
  document.querySelector("#discription").innerHTML =
    responce.data.weather[0].main;
}

function search(city) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
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
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let units = "metric";
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(showTempereture);
}

function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let current = document.querySelector("#currentWeather");
current.addEventListener("click", handlePosition);
//old

let form = document.querySelector("#search-form");
form.addEventListener("submit", saerchCity);

//let temeratureElement = document.querySelector("#temperature");
//let temerature = temeratureElement.innerHTML;

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//function fahrenheit() {
//let temeratur = Number(temerature);
//let fah = Math.round((temeratur * 9) / 5 + 32);
//temeratureElement.innerHTML = fah;
//}
//fahrenheitLink.addEventListener("click", fahrenheit);

//let celLink = document.querySelector("#celsius-link");
//function celsius() {
//temeratureElement.innerHTML = 2;
//}
//celLink.addEventListener("click", celsius);

search("Amsterdam");
