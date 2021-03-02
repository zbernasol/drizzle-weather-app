let dateElement = document.querySelector ("#current-daytime");
let currentTime = new Date ();
let hours = currentTime.getHours ();
if (hours < 10) {
    hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

let dayIndex = currentTime.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[dayIndex];

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months [currentTime.getMonth()];

let year = currentTime.getFullYear();
let date = currentTime.getDate();

dateElement.innerHTML = `<em>Currently</em>: ${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;


function showWeather (weather) {
    let currentTemp = Math.round(weather.data.main.temp);
    let currentLocation = weather.data.name;
    let humid = weather.data.main.humidity;
    let wind = weather.data.wind.speed;

    let displayTemp = document.querySelector("#current-temperature");
    displayTemp.innerHTML = currentTemp;

    let displayLocation = document.querySelector("#current-city");
    displayLocation.innerHTML = currentLocation;

    let displayHumid = document.querySelector("#humidity");
    displayHumid.innerHTML = `${humid}%`;

    let displayWind = document.querySelector("#wind");
    displayWind.innerHTML = `${wind} km/h`;

}

function enterCity (event) {
    event.preventDefault();
    let cityInput = document.querySelector ("#city-input");
    let currentCity = document.querySelector ("#current-city");
    currentCity.innerHTML = `${cityInput.value}`;

    let apiKey = "bc8a0c3d5df6a6835105498aac967ac9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    
    axios.get (apiUrl).then (showWeather);
}

let clickButton = document.querySelector ("#search-button");
clickButton.addEventListener ("click", enterCity);


//Geolocation//

function showPosition (position) {
    let apiKey = "bc8a0c3d5df6a6835105498aac967ac9";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then (showWeather);
}

function currentPosition (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition (showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener ("click", currentPosition);


//celcius and fahrenheit conversion
function convertToFahrenheit (event) {
    event.preventDefault ();
    let temperatureElement = document.querySelector ("#current-temperature");
    let temperature= temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round ((temperature * 9)/5+32);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener ("click", convertToFahrenheit);


function convertToCelcius (event) {
    event.preventDefault ();
    let temperatureElement = document.querySelector ("#current-temperature");
    let temperature = temperatureElement.innerHTML
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round ((temperature - 32)*5/9);
}

let celciusLink = document.querySelector ("#celcius");
celciusLink.addEventListener ("click", convertToCelcius);

