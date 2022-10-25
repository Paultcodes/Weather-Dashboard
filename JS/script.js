var searchButton = document.querySelector(".search-button");

var searchInput = document.querySelector(".search-input");

var today = moment();

// Searches the users input and gets the lat and lon values
var getLonLat = function (city) {
  var city = searchInput.value;

  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=da38c3717cba28733148c29d9be5547d";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (lonLat) {
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
//Searches the lat and lon from the users input
var searchLatLon = function (lat, lon) {
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

//Displays current weather for the location the user searched for
function displayWeather(info) {
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
}

var searchForecast = function (lat, lon) {
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
//Displays forecast on the screen
function displayForecast(forecast) {
  var dateOne = document.querySelector(".date-one");
  var oneDate = forecast.list[4].dt;

  dateOne.textContent = moment.unix(oneDate).format("MM-DD-YYYY");
  var weatherIcon = document.querySelector(".weather-icon-one");
  var icon = forecast.list[6].weather[0].icon;
  weatherIcon.innerHTML = `<img src="images/${icon}.png">`;
  var tempOne = document.querySelector(".temp-one");
  tempOne.textContent = "Temp: " + forecast.list[4].main.temp_max + "°F";
  var windOne = document.querySelector(".wind-one");
  windOne.textContent = "Wind: " + forecast.list[4].wind.speed + " MPH";
  humOne = document.querySelector(".hum-one");
  humOne.textContent = "Humidity: " + forecast.list[4].main.humidity + "%";

  var dateTwo = document.querySelector(".date-two");
  var twoDate = forecast.list[12].dt;
  dateTwo.textContent = moment.unix(twoDate).format("MM-DD-YYYY");
  var weatherIconTwo = document.querySelector(".weather-icon-two");
  var iconTwo = forecast.list[14].weather[0].icon;
  weatherIconTwo.innerHTML = `<img src="images/${iconTwo}.png">`;
  var tempTwo = document.querySelector(".temp-two");
  tempTwo.textContent = "Temp: " + forecast.list[10].main.temp_max + "°F";
  var windTwo = document.querySelector(".wind-two");
  windTwo.textContent = "Wind: " + forecast.list[10].wind.speed + " MPH";
  humTwo = document.querySelector(".hum-two");
  humTwo.textContent = "Humidity: " + forecast.list[10].main.humidity + "%";

  var dateThree = document.querySelector(".date-three");
  threeDate = forecast.list[19].dt;
  dateThree.textContent = moment.unix(threeDate).format("MM-DD-YYYY");
  var weatherIconThree = document.querySelector(".weather-icon-three");
  var iconThree = forecast.list[22].weather[0].icon;
  weatherIconThree.innerHTML = `<img src="images/${iconThree}.png">`;
  var tempThree = document.querySelector(".temp-three");
  tempThree.textContent = "Temp: " + forecast.list[19].main.temp_max + "°F";
  var windThree = document.querySelector(".wind-three");
  windThree.textContent = "Wind: " + forecast.list[19].wind.speed + " MPH";
  humThree = document.querySelector(".hum-three");
  humThree.textContent = "Humidity: " + forecast.list[19].main.humidity + "%";

  var dateFour = document.querySelector(".date-four");
  fourDate = forecast.list[27].dt;
  dateFour.textContent = moment.unix(fourDate).format("MM-DD-YYYY");
  var weatherIconFour = document.querySelector(".weather-icon-four");
  var iconFour = forecast.list[30].weather[0].icon;
  weatherIconFour.innerHTML = `<img src="images/${iconFour}.png">`;
  var tempFour = document.querySelector(".temp-four");
  tempFour.textContent = "Temp: " + forecast.list[26].main.temp_max + "°F";
  var windFour = document.querySelector(".wind-four");
  windFour.textContent = "Wind: " + forecast.list[26].wind.speed + " MPH";
  humFour = document.querySelector(".hum-four");
  humFour.textContent = "Humidity: " + forecast.list[26].main.humidity + "%";

  var dateFive = document.querySelector(".date-five");
  fiveDate = forecast.list[35].dt;
  dateFive.textContent = moment.unix(fiveDate).format("MM-DD-YYYY");
  var weatherIconFive = document.querySelector(".weather-icon-five");
  var iconFive = forecast.list[38].weather[0].icon;
  weatherIconFive.innerHTML = `<img src="images/${iconFive}.png">`;
  var tempFive = document.querySelector(".temp-five");
  tempFive.textContent = "Temp: " + forecast.list[35].main.temp_max + "°F";
  var windFive = document.querySelector(".wind-five");
  windFive.textContent = "Wind: " + forecast.list[35].wind.speed + " MPH";
  humFive = document.querySelector(".hum-five");
  humFive.textContent = "Humidity: " + forecast.list[35].main.humidity + "%";
}

var searchHistory = document.querySelector(".search-history");

var check = [];
//Creates a button for each string inside of the check array and then acts as the users search history
function showHistory() {
  searchHistory.innerHTML = "";
  for (let i = 0; i < check.length; i++) {
    const localHistory = check[i];

    var buttonHis = document.createElement("button");
    buttonHis.classList.add("btn");
    buttonHis.style.cursor = "pointer";
    buttonHis.textContent = localHistory;

    searchHistory.appendChild(buttonHis);
  }
  var historyButton = document.getElementsByClassName("btn");

  for (let i = 0; i < historyButton.length; i++) {
    historyButton[i].addEventListener("click", function (show) {
      show = historyButton[i].textContent;

      getHistory(show);
    });
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
});

init();
//searches the weather when user clicks on one of the search history buttons
var getHistory = function (search) {
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    search +
    "&limit=1&appid=da38c3717cba28733148c29d9be5547d";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (hisLon) {
          searchLatLon(hisLon[0].lat, hisLon[0].lon);
          searchForecast(hisLon[0].lat, hisLon[0].lon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to WeatherService");
    });
};
