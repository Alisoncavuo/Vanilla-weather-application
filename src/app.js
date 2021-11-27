//Get axios code, my apikey from weatherman, the weather url, add the apiKey in url, add unit in metric, ask axios to get url and display temp

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#degree-number");
  let city = document.querySelector("#city");
  let description = document.querySelector("#cloudy");
  let humidity = document.querySelector(".humidity");
  let feelslike = document.querySelector(".feels-like");
  let wind = document.querySelector(".wind");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  feelslike.innerHTML = `Feels like ${response.data.main.feels_like}°C`;
  wind.innerHTML = `Wind ${response.data.wind.speed}km/h`;
}

let apiKey = "190152064d2b31379030a729490bb67f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
