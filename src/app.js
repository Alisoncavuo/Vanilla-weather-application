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
  let emoji = document.querySelector("#emoji");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  feelslike.innerHTML = `Feels like ${response.data.main.feels_like}°C`;
  wind.innerHTML = `Wind ${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  emoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

function showFarenTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree-number");
  //remove the active class the celcius link
  celciLink.classList.remove("active");
  farenLink.classList.add("active");
  let farenTemp = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenTemp);
}

function showCelciTemp(event) {
  event.preventDefault();
  celciLink.classList.add("active");
  farenLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degree-number");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function dayAndNight() {
  let currentDay = new Date();
  let dayNight = currentDay.getHours();
  if (dayNight < 12) {
    let bodyColor = document.querySelector("body");
    bodyColor.style.background = "blue";
  } else {
    let bodyColor = document.querySelector("body");
    bodyColor.style.background = "red";
  }
}

let celciusTemperature = null;

let form = document.querySelector("#weather-form");
form.addEventListener("submit", handlesubmit);

let farenLink = document.querySelector("#faren-link");
farenLink.addEventListener("click", showFarenTemp);

let celciLink = document.querySelector("#celci-link");
celciLink.addEventListener("click", showCelciTemp);

search("new york");

//function dayAndNight(submit) {
//let currentDay = new Date();
//let dayNight = currentDay.getHours();
//if (dayNight < 12) {
// let bodyColor = document.querySelector("body");
// bodyColor.style.background = "blue";
// } else {
//  let bodyColor = document.querySelector("body");
//  bodyColor.style.background = "red";
//}
//}

//let bodyBackground = document.querySelector("body");
//bodyBackground.addEventListener("submit", dayAndNight);
