var submitEl = document.querySelector("#submit-form");
var cityInput = document.querySelector("#search-input");
var cityTitle = document.querySelector("#city");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumidity = document.querySelector("#current-humidity");
var fiveDay = document.querySelector("#five-day");
var weatherPicture = document.querySelector("#weather-icon");
var forePicture = document.querySelector("#fore-icon")
var cityList = document.querySelector("#cities");
var cardContainer = document.querySelector("#card-container");

var dayDate = dayjs().format("M/D/YYYY");

var latitude = "string";
var longitude = "string";
var cityName = "string";
var citiesInStorage = JSON.parse(localStorage.getItem("citySearch")) || []

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInput.value.trim();

    if (cityName) {

        getLatLonCity(cityName);
        document.getElementById("cities").innerHTML = "";

        for (let i = 0; i < citiesInStorage.length; i++) {
            var cityButton = document.createElement("button");
            cityButton.setAttribute("class", "btn btn-primary");
            cityButton.textContent = citiesInStorage[i];
            document.getElementById("cities").appendChild(cityButton);
        }

    } else {
        alert("Please enter a city name.");
    }
};

var buttonClickHandler = function (event) {
    getLatLonCity(event.target.textContent);
}

var latitude = "";
var longitude = "";
var cityName = "";
var rowDivEl = document.getElementById("five-day")


var getLatLonCity = function (city) {

    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=44be570f60fd1ef1f012456a39e5a0ff";

    fetch(apiURL).then(function (response) {

        if (response.ok) {
            response.json().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    latitude = data[i].lat;
                    longitude = data[i].lon;
                    cityName = data[i].name;

                    if (!citiesInStorage.includes(cityName)) {
                        citiesInStorage.push(cityName);
                        localStorage.setItem("citySearch", JSON.stringify(citiesInStorage));
                    }
                    
                    getWeather(latitude, longitude);
                    getFiveDay(latitude, longitude);
                }
            })
        }
    })
};

var getWeather = function (latitude, longitude) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=44be570f60fd1ef1f012456a39e5a0ff";

    fetch(weatherURL).then(function (response) {
       
        if (response.ok) {
            response.json().then(function (weather) {

                var temperature = weather.main.temp;
                var windSpeed = weather.wind.speed;
                var humidity = weather.main.humidity;
                var iconCode = weather.weather[0].icon;

                weatherPicture = "https://openweathermap.org/img/w/" + iconCode + ".png";

                cardContainer.setAttribute("class","card p-3 my-2")
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


    fetch(fiveDayURL).then(function (response) {
        response.json().then(function (fiveDayData) {
         
            rowDivEl.innerHTML = "";
            for (let i = 1; i < 6; i++) {
                var foreDay = dayjs().add([i], "day").format("M/D/YYYY");
                var foreIcon = fiveDayData.list[i].weather[0].icon;
                var foreTemp = ((((fiveDayData.list[i].main.temp) - 273.15) * 1.8) + 32).toFixed(2) + " F";
                var foreWind = fiveDayData.list[i].wind.speed;
                var foreHumidity = fiveDayData.list[i].main.humidity;

                var foreList = document.createElement("div");
                foreList.setAttribute("class", "col-12 col-xl");
                var cardEl = document.createElement("div");
                cardEl.setAttribute("class", "card p-3 my-2 fs-6");
                var titleEl = document.createElement("h4");
                var tempEl = document.createElement("p");
                var windEl = document.createElement("p");
                var humidityEl = document.createElement("p");
                titleEl.textContent = foreDay;
                tempEl.textContent = "TEMP: " + foreTemp;
                windEl.textContent = "WIND: " + foreWind + " MPH";
                humidityEl.textContent = "HUMIDITY: " + foreHumidity + "%";

                var weatherPicture = "https://openweathermap.org/img/w/" + foreIcon + ".png";


                var pic = document.createElement("img");
                pic.setAttribute("alt", "weather icon"); 
                pic.src = weatherPicture;
                pic.setAttribute("height", "100");
                pic.setAttribute("width", "100");

                cardEl.appendChild(titleEl);
                cardEl.appendChild(pic);

                cardEl.appendChild(tempEl);
                cardEl.appendChild(humidityEl);
                cardEl.appendChild(windEl);
                foreList.appendChild(cardEl);
               rowDivEl.appendChild(foreList);
            }
        })
    });
}


submitEl.addEventListener("submit", formSubmitHandler);
cityList.addEventListener("click", buttonClickHandler);
