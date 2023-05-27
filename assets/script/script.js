var submitEl = document.querySelector("#submit-form");
var cityInput = document.querySelector("#search-input");
var currentWeather = document.querySelector("#current-weather");
var fiveDay = document.querySelector("#five-day");
var cityLink = document.querySelector("#city-link");

// sample api call
//http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=44be570f60fd1ef1f012456a39e5a0ff

// API to make a lat lon call from city name
// http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=44be570f60fd1ef1f012456a39e5a0ff
// Comes back in an array "name": "City Name"; "lat"= value; "lon"= value

// Current weather call
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=44be570f60fd1ef1f012456a39e5a0ff

// "main.temp"; "wind.speed"; "main.humidity"

// five day call
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=appid=44be570f60fd1ef1f012456a39e5a0ff

// 

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();

    if (cityName) {
        getWeather(cityName);

        currentWeather.textContent="";
        fiveDay.textContent="";
        cityInput="";
        } else {
            alert("Please enter a city name.");
        }
};

var buttonClickHandler = function (event) {
    // will be links to the searched cities
}

var getWeather =  function (city) {
    var apiURL = "https://the weather link";

    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data.items, the items);
            });
        } else {
            alert("Error: " + response.statusText);
        }
        });
};

var displayWeather = function(something) {
    if (Weather.length ===0) {
        Let them know nothing was formSubmitHandler;
        return;
    }
}

// save the input to local storage and then display it in the searched cities section

submitEl.addEventListener("submit", formSubmitHandler);
cityLink.addEventListener("click", formSubmitHandler);
