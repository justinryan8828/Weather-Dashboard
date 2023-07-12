// Input
var searchCity = document.querySelector("#searchCity");
// button
var submitButton = document.querySelector("#submitButton");
// api Key
var apiKey = "f3ff5901402986dd4ec3b605204bfe0c";

function getCoordinates(param) {
  // template literal allows you to write a string while also passing variable
  // DONT FORGET TO ADD HTTPS WHEN DEPLOYING
  var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${param}&limit=5&appid=${apiKey}`;
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

      currentTemp.innerHTML = `<h2>${data.name}</h2><div>${data.weather[0].icon}</div><div>${data.main.temp}</div><div>${data.main.humidity}</div><div>${data.wind.speed}</div>`;

      // saving lattitude and longitude
      //   console.log(data[0].lat);
      //   console.log(data[0].lon);
      //   getWeather(data[0].lat, data[0].lon);
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
