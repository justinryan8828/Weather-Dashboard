// Input
var searchCity = document.querySelector("#searchCity");
// button
var submitButton = document.querySelector("#submitButton");
// api Key
var apiKey = "f3ff5901402986dd4ec3b605204bfe0c";

function getCoordinates(param) {
  // template literal allows you to write a string while also passing variable
  // DONT FORGET TO ADD HTTPS WHEN DEPLOYING
  var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${param}&limit=5&appid=${apiKey}`;
  console.log(apiUrl);
  fetch(apiUrl)
    .then(function (Response) {
      // repsponse tells us data on fetch

      return Response.json();
    })
    .then(function (data) {
      console.log(data);
      // saving lattitude and longitude
      console.log(data[0].lat);
      console.log(data[0].lon);
      getWeather(data[0].lat, data[0].lon);
    });
}

function getWeather(lat, lon) {
  console.log(lat + "" + lon);

  var secondApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;

  // run fetch to get the weather data and display the weather data
  // create element, append, textContent, maybe innerhtml
  // loop
}
submitButton.addEventListener("click", function () {
  getCoordinates(searchCity.value);
});
