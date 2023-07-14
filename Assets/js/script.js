let cityArray = [];
// Input
var searchCity = document.querySelector("#searchCity");
// button
var submitButton = document.querySelector("#submitButton");
// api Key
var apiKey = "f3ff5901402986dd4ec3b605204bfe0c";

displayCities();

async function getCoordinates(param) {
  // template literal allows you to write a string while also passing variable
  // DONT FORGET TO ADD HTTPS WHEN DEPLOYING
  var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${param}&limit=5&appid=${apiKey}&units=imperial`;
  await fetch(apiUrl)
    .then(function (Response) {
      // repsponse tells us data on fetch

      return Response.json();
    })
    .then(function (data) {
      //the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

      var currentTemp = document.querySelector("#currentTemp");
      var icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

      currentTemp.innerHTML = `<h2>${data.name} <br> Current Forecast:</h2><img src=${icon}></img><div>Tempature: ${data.main.temp}</div><div>Humidty: ${data.main.humidity}</div><div>Wind Speed: ${data.wind.speed} mph</div>`;

      fiveDay(data.coord.lon, data.coord.lat);
      citySave(data.name);
    });
}
// 5 day weather, dont forget to style
async function fiveDay(lon, lat) {
  var apiFiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  await fetch(apiFiveDay)
    .then(function (Response) {
      return Response.json();
    })
    .then(function (data) {
      // this will clear the existing forecast
      document.getElementById("forecast").innerHTML = "Five Day Forecast:";

      for (var i = 3; i < data.list.length; i += 8) {
        var icon = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;

        document.getElementById(
          "forecast"
        ).innerHTML += `<div class = "card col-2">
        <img src=${icon} class = "iconClass"></img>
        <div>Tempature: ${data.list[i].main.temp}</div>
        <div>Humidty: ${data.list[i].main.humidity}</div>
        <div>Wind Speed: ${data.list[i].wind.speed} mph</div>
        </div>`;
      }
    });
}

function citySave(city) {
  cityArray = JSON.parse(localStorage.getItem("searchHistory"));

  if (cityArray.indexOf(city) !== -1) return;
  cityArray.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(cityArray));
  displayCities();
}

function displayCities() {
  var historyButton = document.querySelector("#historyButton");

  historyButton.innerHTML = "";
  var storedSearchHistory =
    JSON.parse(localStorage.getItem("searchHistory")) || [];
  storedSearchHistory.forEach(function (city) {
    var btn = document.createElement("button");
    btn.textContent = city;
    historyButton.append(btn);
    btn.addEventListener("click", function () {
      getCoordinates(city);
    });
  });
}

function initPage() {
  cityArray = JSON.parse(localStorage.getItem("searchHistory")) || [];
  localStorage.setItem("searchHistory", JSON.stringify(cityArray));
}

initPage();

submitButton.addEventListener("click", function () {
  getCoordinates(searchCity.value);
  localStorage.setItem("searchCity", JSON.stringify(searchCity));
});
