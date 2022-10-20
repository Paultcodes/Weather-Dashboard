var searchButton = document.querySelector(".search-button");

var searchInput = document.querySelector(".search-input");

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
          console.log(weather.list[0].wind.speed);
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
  currentCity.textContent = info.city.name;
  var currentTemp = document.querySelector(".current-temp");
  currentTemp.textContent = "Temp: " + info.list[0].main.temp + "°F";
  var currentWind = document.querySelector(".current-wind");
  currentWind.textContent = "Wind: " + info.list[0].wind.speed + " MPH";
  var currentHumidity = document.querySelector(".current-humidity");
  currentHumidity.textContent =
    "humidity: " + info.list[0].main.humidity + " %";
}

// wind.speed
// main.humidity
