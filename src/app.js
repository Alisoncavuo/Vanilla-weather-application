//Get axios code, my apikey from weatherman, the weather url, add the apiKey in url, add unit in metric, ask axios to get url and display temp

//timestamp:number of miliseconds that has happened since 1970. thats how date in js works

function formatDate(timestamp) {
  //calculate the date

  let dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timestamp);
  let day = dayArray[date.getDay()];
  let dateNumber = date.getDate();

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${dateNumber}th, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast-temp");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="forecast-weekday">${formatDay(forecastDay.dt)}</div>
                
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  width="48"
                />
                <div class="forecast-temp">
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "190152064d2b31379030a729490bb67f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#degree-number");
  let city = document.querySelector("#city");
  let description = document.querySelector("#cloudy");
  let humidity = document.querySelector(".humidity");
  let feelslike = document.querySelector(".feels-like");
  let wind = document.querySelector(".wind");
  let timeElement = document.querySelector("#time-date");
  let emoji = document.querySelector("#emoji");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  feelslike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)}km/h`;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  emoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "190152064d2b31379030a729490bb67f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handlesubmit(event) {
  //prevent page form reoading
  event.preventDefault();
  let cityInput = document.querySelector("#form-control");
  search(cityInput.value);
}

let form = document.querySelector("#weather-form");
form.addEventListener("submit", handlesubmit);

search("new york");

function searchLocation(position) {
  let apiKey = "190152064d2b31379030a729490bb67f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let buttonTwo = document.querySelector("#current-location");
buttonTwo.addEventListener("click", getCurrentPosition);
