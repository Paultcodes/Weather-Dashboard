var searchButton = document.querySelector(".search-button");

var searchInput = document.querySelector(".search-input");

var today = moment();

var getLonLat = function (city) {
  // var apiKey = "da38c3717cba28733148c29d9be5547d";
  var city = searchInput.value;

  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=da38c3717cba28733148c29d9be5547d";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (lonLat) {
          console.log(lonLat[0].lat, lonLat[0].lon);
          searchLatLon(lonLat[0].lat, lonLat[0].lon);
          searchForecast(lonLat[0].lat, lonLat[0].lon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to WeatherService");
    });
};

searchButton.addEventListener("click", getLonLat);

var searchLatLon = function (lat, lon) {
  // var city = searchInput.value;
  var latData = lat;
  var lonData = lon;

  var apiUrl =
    " https://api.openweathermap.org/data/2.5/weather?lat=" +
    latData +
    "&lon=" +
    lonData +
    "&appid=da38c3717cba28733148c29d9be5547d&units=imperial";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (weather) {
          console.log(weather);
          // console.log(weather.list[0].wind.speed);
          displayWeather(weather);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to WeatherService");
    });
};

//weather.city.name

//

function displayWeather(info) {
  console.log(info);
  var currentCity = document.querySelector(".current-city");
  currentCity.textContent = info.name + today.format(" (MM-DD-YYYY)");
  var weatherIcon = document.querySelector(".weather-icon");
  var icon = info.weather[0].icon;
  weatherIcon.innerHTML = `<img src="images/${icon}.png">`;
  var currentTemp = document.querySelector(".current-temp");
  currentTemp.textContent = "Temp: " + info.main.temp + "°F";
  var currentWind = document.querySelector(".current-wind");
  currentWind.textContent = "Wind: " + info.wind.speed + " MPH";
  var currentHumidity = document.querySelector(".current-humidity");
  currentHumidity.textContent = "Humidity: " + info.main.humidity + "%";
  // console.log(icon);
}

var searchForecast = function (lat, lon) {
  // var city = searchInput.value;
  var latData = lat;
  var lonData = lon;

  var apiUrl =
    " https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latData +
    "&lon=" +
    lonData +
    "&appid=da38c3717cba28733148c29d9be5547d&units=imperial";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (weather) {
          console.log(weather);
          // console.log(weather.list[0].wind.speed);
          displayForecast(weather);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to WeatherService");
    });
};

function displayForecast(forecast) {
  console.log(forecast);
  var dateOne = document.querySelector(".date-one");
  var oneDate = forecast.list[4].dt;
  console.log(oneDate);
  dateOne.textContent = moment.unix(oneDate).format("MM-DD-YYYY");
  var weatherIcon = document.querySelector(".weather-icon-one");
  var icon = forecast.list[4].weather[0].icon;
  weatherIcon.innerHTML = `<img src="images/${icon}.png">`;
  var tempOne = document.querySelector(".temp-one");
  tempOne.textContent = "Temp: " + forecast.list[4].main.temp + "°F";
  var windOne = document.querySelector(".wind-one");
  windOne.textContent = "Wind: " + forecast.list[4].wind.speed + " MPH";
  humOne = document.querySelector(".hum-one");
  humOne.textContent = "Humidity: " + forecast.list[4].main.humidity + "%";
}

var searchHistory = document.querySelector(".search-history");

var check = [];

function showHistory() {
  searchHistory.innerHTML = "";
  for (let i = 0; i < check.length; i++) {
    const localHistory = check[i];

    var buttonHis = document.createElement("button");
    buttonHis.textContent = localHistory;

    searchHistory.appendChild(buttonHis);
  }
}

function init() {
  var storedHistory = JSON.parse(localStorage.getItem("weatherHistory"));

  if (storedHistory !== null) {
    check = storedHistory;
  }
  showHistory();
}

function storeHistory() {
  localStorage.setItem("weatherHistory", JSON.stringify(check));
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  var historyText = searchInput.value.trim();

  if (historyText === "") {
    return;
  }

  check.push(historyText);
  searchInput.value = "";
  storeHistory();
  showHistory();
  console.log(check);
});

init();
