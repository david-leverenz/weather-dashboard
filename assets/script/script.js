var submitEl = document.querySelector("#submit-form");
var cityInput = document.querySelector("#search-input");
var currentWeather = document.querySelector("#current-weather");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumidity = document.querySelector("#current-humidity");
var fiveDay = document.querySelector("#five-day");
var fiveTemp = document.querySelector("#five-temp");
var fiveHumidity = document.querySelector("#five-humidity");
var fiveWind = document.querySelector("#five-wind");
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

// loop "dt_txt", "main.temp", "wind.speed"; "main.humidity"


var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();

    if (cityName) {
        getLatLon(cityName);

        currentWeather.textContent = "";
        fiveDay.textContent = "";
        cityInput = "";
    } else {
        alert("Please enter a city name.");
    }
};

// var buttonClickHandler = function (event) {
//     // will be links to the searched cities
// }

// getWeather();

// var cityName = "London";

var getLatLon = function (city) {
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=44be570f60fd1ef1f012456a39e5a0ff";

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var latitude = data[i].lat;
                    var longitude = data[i].lon;
                    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
                    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=44be570f60fd1ef1f012456a39e5a0ff";
                    console.log(weatherURL);

                    fetch(weatherURL).then(function (response){
                        console.log(weatherURL);
                        if (response.ok) {
                            response.json().then(function (data) {
                                console.log(data);
                                for (var i = 0; i < data.length; i++) {
                                    console.log(data);
                                    console.log(data[i].main.temp);
                                    var temperature = data[i].main.temp;
                                    var windSpeed = data[i].wind.speed;
                                    var humidity = data[i].main.humidity;
                                    console.log(temperature, windSpeed, humidity);
                                    }

                            })
                        }
                    })
                }

            });
        } else {
            alert("Error: " + response.statusText);
        }
        // var getWeather = function (latitude, longitude) {
        //     var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=44be570f60fd1ef1f012456a39e5a0ff"
        //     console.log(weatherURL);
        // }

    });
};



// var LatLon = function (latitude, longitude) {
//     if (latitude.length === 0) {
//         alert("No latitude found.");
//     } else if (longitude.length === 0) {
//         alert("No longitude found.");
//     }
//     return;
// }


// save the input to local storage and then display it in the searched cities section

submitEl.addEventListener("submit", formSubmitHandler);
// cityLink.addEventListener("click", buttonClickHandler);
