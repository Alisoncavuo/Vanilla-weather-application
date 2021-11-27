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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#degree-number");
  let city = document.querySelector("#city");
  let description = document.querySelector("#cloudy");
  let humidity = document.querySelector(".humidity");
  let feelslike = document.querySelector(".feels-like");
  let wind = document.querySelector(".wind");
  let timeElement = document.querySelector("#time-date");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  feelslike.innerHTML = `Feels like ${response.data.main.feels_like}°C`;
  wind.innerHTML = `Wind ${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "190152064d2b31379030a729490bb67f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
