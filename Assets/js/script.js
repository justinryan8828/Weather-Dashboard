// Input
var searchCity = document.querySelector("#searchCity");
// button
var submitButton = document.querySelector("#submitButton");
// api Key
var apiKey = "f3ff5901402986dd4ec3b605204bfe0c";

function getCoordinates(param) {
  // template literal allows you to write a string while also passing variable
  // DONT FORGET TO ADD HTTPS WHEN DEPLOYING
  var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${param}&limit=5&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  fetch(apiUrl)
    .then(function (Response) {
      // repsponse tells us data on fetch

      return Response.json();
    })
    .then(function (data) {
      console.log(data);
      //the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
      console.log(data.name, data.weather[0].icon);

      var currentTemp = document.querySelector("#currentTemp");
      var icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

      currentTemp.innerHTML = `<h2>City: ${data.name}</h2><img src=${icon}></img><div>Tempature: ${data.main.temp}</div><div>Humidty: ${data.main.humidity}</div><div>Wind Speed: ${data.wind.speed} mph</div>`;

      fiveDay(data.coord.lon, data.coord.lat);
    });
}
// 5 day weather, dont forget to style
function fiveDay(lon, lat) {
  var apiFiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(apiFiveDay)
    .then(function (Response) {
      return Response.json();
    })
    .then(function (data) {
      console.log(data);

      for (var i = 3; i < data.list.length; i += 8) {
        var icon = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;

        document.getElementById(
          "forecast"
        ).innerHTML += `<h2></h2><img src=${icon}></img><div>Tempature: ${data.list[i].main.temp}</div><div>Humidty: ${data.list[i].main.humidity}</div><div>Wind Speed: ${data.list[i].wind.speed} mph</div>`;
      }
    });
}
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// function getWeather(lat, lon) {
//   console.log(lat + "" + lon);

//   var secondApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;

//   fetch(secondApiUrl).then(function (Response) {
//     return Response.json();
//   });

//   // run fetch to get the weather data and display the weather data
//   // create element, append, textContent, maybe innerhtml
//   // loop
// }
submitButton.addEventListener("click", function () {
  getCoordinates(searchCity.value);
});
