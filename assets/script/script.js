var submitEl = document.querySelector("#submit-form");
var cityInput = document.querySelector("#search-input");
var cityTitle = document.querySelector("#city");
var currentWeather = document.querySelector("#current-weather");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumidity = document.querySelector("#current-humidity");
var fiveDay = document.querySelector("#five-day");
var fiveDayDay = document.querySelector("#five-day-day")
var fiveTemp = document.querySelector("#five-temp");
var fiveHumidity = document.querySelector("#five-humidity");
var fiveWind = document.querySelector("#five-wind");
// var cityLink = document.querySelector("#city-link");
var weatherPicture = document.querySelector("#weather-icon");
var cityList = document.querySelectorAll("#cities");

// sample api call
//http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=44be570f60fd1ef1f012456a39e5a0ff

// API to make a lat lon call from city name
// http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=44be570f60fd1ef1f012456a39e5a0ff
// Comes back in an array "name": "City Name"; "lat"= value; "lon"= value

// Current weather call
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=44be570f60fd1ef1f012456a39e5a0ff

// "main.temp"; "wind.speed"; "main.humidity"

// five day call


// loop "dt_txt", "main.temp", "wind.speed"; "main.humidity"

var dayDate = dayjs().format("M/D/YYYY");
// console.log(dayDate);

var latitude = "string";
var longitude = "string";
var cityName = "string";

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();

    if (cityName) {
        // getWeather(cityName);
        getLatLonCity(cityName);

        // var cityLink = document.createElement("btn");
        var pastCity = localStorage.getItem("citySearch");
        // console.log(cityLink);
        // cityLink.setAttribute("class", "btn-secondary");
        document.getElementById("cities").append(pastCity);
        // console.log(pastCity);


    } else {
        alert("Please enter a city name.");
    }
};

// var buttonClickHandler = function (event) {
//     // will be links to the searched cities
// }

var latitude = "";
var longitude = "";
var cityName = "";

var getLatLonCity = function (city) {

    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=44be570f60fd1ef1f012456a39e5a0ff";

    fetch(apiURL).then(function (response) {

        if (response.ok) {
            response.json().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    latitude = data[i].lat;
                    longitude = data[i].lon;
                    cityName = data[i].name;

                    localStorage.setItem("citySearch", cityName)

                    // console.log(data[i].name);
                    // console.log("City: " + cityName + ", " + "Latitude: " + latitude + ", Longitude: " + longitude);
                    getWeather(latitude, longitude);
                    getFiveDay(latitude, longitude);
                }
            })
        }
    })
};

var getWeather = function (latitude, longitude) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=44be570f60fd1ef1f012456a39e5a0ff";

    // console.log(weatherURL);
    // console.log(latitude, longitude);

    fetch(weatherURL).then(function (response) {
        // console.log(weatherURL);
        if (response.ok) {
            response.json().then(function (weather) {
                // console.log(weather);
                // console.log(weather.main.temp);

                var temperature = weather.main.temp;
                var windSpeed = weather.wind.speed;
                var humidity = weather.main.humidity;
                var iconCode = weather.weather[0].icon;
                // console.log(iconCode);
                // console.log("Temp: " + temperature + ", Wind Speed: " + windSpeed + ", Humidity: " + humidity);


                weatherPicture = "https://openweathermap.org/img/w/" + iconCode + ".png";
                // console.log(weatherPicture);

                var pic = document.createElement("img");
                pic.setAttribute("alt", "weather icon"); pic.src = weatherPicture;
                pic.setAttribute("height", "100");
                pic.setAttribute("width", "100");
                document.getElementById("weather-icon").innerHTML = "";
                document.getElementById("weather-icon").appendChild(pic);

                cityTitle.textContent = cityName + " " + dayDate
                currentTemp.textContent = "TEMP: " + (((temperature - 273.15) * 1.8) + 32).toFixed(2) + " F";
                currentWind.textContent = "WIND: " + windSpeed.toFixed(2) + " MPH";
                currentHumidity.textContent = "HUMIDITY: " + humidity + "%";

            })
        }
    })

};
var getFiveDay = function (latitude, longitude) {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=44be570f60fd1ef1f012456a39e5a0ff";
    // console.log(fiveDayURL);
    // console.log(latitude, longitude);

    fetch(fiveDayURL).then(function (response) {
        response.json().then(function (fiveDayData) {
            console.log(fiveDayData);
            for (let i = 0; i < 6; i++) {
                var foreDay = dayjs().add([i], "day").format("M/D/YYYY");
                // for (let iconIndex = 0; iconIndex < 5; iconIndex++) {
                //     var foreIcon = fiveDayData.list[i].weather[iconIndex].icon; 
                // };    
                // var foreIcon = fiveDayData.list[i].weather[i].icon;            
                var foreTemp = fiveDayData.list[i].main.temp;
                var foreWind = fiveDayData.list[i].wind.speed;
                var foreHumidity = fiveDayData.list[i].main.humidity;
                console.log((((foreTemp - 273.15) * 1.8) + 32).toFixed(2) + " F", foreWind, foreHumidity, foreDay);

                // fiveDayDay.textContent = foreDay;

                var foreList = document.createElement("div");
                foreList.setAttribute("class", "col-12 col-xl");
                document.getElementById("five-day").append(foreDay);
                document.getElementById("five-day").append((((foreTemp - 273.15) * 1.8) + 32).toFixed(2) + " F");

                // fiveDay.append(foreDay);

            }
        })
    });
}






//             });

//         } else {
//             alert("Error: " + response.statusText);
//         }

//     });
// };

submitEl.addEventListener("submit", formSubmitHandler);
// cityLink.addEventListener("click", buttonClickHandler);
