function formatCurrentDate (timestamp) {
  let date = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let todayDate = date.getDate();
let getDate = document.querySelector("#date");
return (getDate.innerHTML = (`${day}, ${month} ${todayDate}`));
}

function formatHours (timestamp) {
 let date = new Date (timestamp); 
let hour = date.getHours();
let nowHour = document.querySelector("#hour");
if (nowHour <10) {
hour = `0${hour}`;
}
let mintues = date.getMinutes();
if (mintues<10) {
  mintues = `0${mintues}`;
}
return `${hour}:${mintues}`;
}

let formatDate = document.querySelector("#date");
formatDate.innerHTML = formatCurrentDate(new Date());

let formatHour = document.querySelector("#hour");
formatHour.innerHTML = formatHours(new Date());

function displayForecast(response) {
  let forecastElement = document.querySelector ("#forecast");
  let forecast= response.data.list;
  forecastElement.innerHTML = `
   <div class="row dates">
   <div class="col">
      <p>${formatHours(forecast[0].dt*1000)}</p>
      </div>
      <div class="col">
        <p>${formatHours(forecast[1].dt*1000)}</p>
      </div>
      <div class="col">
        <p>${formatHours(forecast[2].dt*1000)}</p>
      </div>
      <div class="col">
        <p>${formatHours(forecast[3].dt*1000)}</p>
      </div>
      <div class="col">
        <p>${formatHours(forecast[4].dt*1000)}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <img src="http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png" class="weather-icon">
      </div>
      <div class="col">
        <img src="http://openweathermap.org/img/wn/${forecast[1].weather[0].icon}@2x.png" class="weather-icon">
      </div>
      <div class="col">
        <img src="http://openweathermap.org/img/wn/${forecast[2].weather[0].icon}@2x.png" class="weather-icon">
      </div>
      <div class="col">
        <img src="http://openweathermap.org/img/wn/${forecast[3].weather[0].icon}@2x.png" class="weather-icon">
      </div>
      <div class="col">
        <img src="http://openweathermap.org/img/wn/${forecast[4].weather[0].icon}@2x.png" class="weather-icon">
      </div>
    </div>
    <div class="row future-temperatures">
      <div class="col">
        <p>${Math.round(forecast[0].main.temp_max)}°| ${Math.round(forecast[0].main.temp_min)}°</p>
      </div>
      <div class="col">
        <p>${Math.round(forecast[1].main.temp_max)}°| ${Math.round(forecast[1].main.temp_min)}°</p>
      </div>
      <div class="col">
        <p>${Math.round(forecast[2].main.temp_max)}°| ${Math.round(forecast[2].main.temp_min)}°</p>
      </div>
      <div class="col">
        <p>${Math.round(forecast[3].main.temp_max)}°| ${Math.round(forecast[3].main.temp_min)}°</p>
      </div>
      <div class="col">
        <p>${Math.round(forecast[4].main.temp_max)}°| ${Math.round(forecast[4].main.temp_min)}°</p>
      </div>
    </div>`;
}



function searchCity(city) {
let apiKey = "bc8a0c3d5df6a6835105498aac967ac9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);

}




function submitCity (event) {
event.preventDefault();
let city = document.querySelector("#city-text").value;
searchCity(city);
}

let searchNewCity = document.querySelector("#search-form");
searchNewCity.addEventListener("submit", submitCity);


function showWeather (response) {

let temperatureElement = document.querySelector ("#now-temp");
celciusTemperature = response.data.main.temp;
temperatureElement.innerHTML = Math.round (celciusTemperature);


document.querySelector("#date").innerHTML = formatCurrentDate(response.data.dt*1000);  
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#min-temp").innerHTML = (`${Math.round(response.data.main.temp_min)}°`);
document.querySelector("#max-temp").innerHTML = (`${Math.round(response.data.main.temp_max)}°`);
document.querySelector("#feels-like").innerHTML = (`${Math.round(response.data.main.feels_like)}°`);
document.querySelector("#humidity").innerHTML = (`${Math.round(response.data.main.humidity)}%`);
document.querySelector("#wind-speed").innerHTML = (`${Math.round(response.data.wind.speed)}m/s`);
document.querySelector("#description").innerHTML =response.data.weather[0].description;
document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#weather-icon").setAttribute("alt", response.data.weather[0].description);
}

function showCurrentPosition (event) {
  event.preventDefault();
 navigator.geolocation.getCurrentPosition(searchLocation); 
}

function searchLocation (position) {
let lat = position.coords.latitude;
let long = position.coords.longitude;
let apiKey = "bc8a0c3d5df6a6835105498aac967ac9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click",showCurrentPosition);

function displayFahrenheitTemperature (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector ("#now-temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celciusTemperature*9)/5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature (event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector ("#now-temp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector ("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

searchCity("Toronto");