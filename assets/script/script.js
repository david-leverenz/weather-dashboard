var cityInput = document.querySelector("#searchInput");
var currentWeather = document.querySelector("#current-weather");
var fiveDay = document.querySelector("#five-day");
var cityLink = document.querySelector("#city-link");

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


