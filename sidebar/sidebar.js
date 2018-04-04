// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOhiVrfEuT-sKalrJuS5ybISyO82AxNGU",
    authDomain: "stellardb-46d8e.firebaseapp.com",
    databaseURL: "https://stellardb-46d8e.firebaseio.com",
    projectId: "stellardb-46d8e",
    storageBucket: "stellardb-46d8e.appspot.com",
    messagingSenderId: "496723057474"
};
firebase.initializeApp(config);
// var database = database.firebase();
var userLocationAPI = "https://ipapi.co/json/";
var weatherAPIkey = "e8d69762e08e410c09554049e5f73082";
// ES5
var isWeatherPending = false;
var isLocationPending = false;
// ES7
// ES6

var getCurrentWeather = function (lat, long, state) {
    isLocationPending = true;
    $(".pending").html("Loading....");
    var weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?APPID=${weatherAPIkey}&lat=${lat}&lon=${long}&units=Imperial`;
    var sunRiseSunSet = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}`;
    setTimeout(function () {
        $.ajax({
            // dateType: "jsonp",
            url: weatherAPIURL,
            method: "GET"
        })
            .then(function (weather) {
                // console.log("Weather: ", weather);
                isLocationPending = false;
                $(".pending").html("");
                // Farenheit = Imperial
                // Celsius = Metric
                // Kevin = Default
                $("#weatherCity").html(`City:  ${weather.name}`);
                $("#weatherState").html("State: " + state);
                $("#weatherTemparature").html(`Temperature: ${Math.round(weather.main.temp)}°F`);
                // $("#weatherPrecipation").htm(weather.name);
                $("#weatherWind").html(`Wind Speed: ${Math.round(weather.wind.speed)} mph`);

            })
            .then(res => {
                $.ajax({
                    url: sunRiseSunSet,
                    method: "GET"
                })
                .then(sun => {
                    // console.log('sun: ', sun)
                    var sunrise = (sun.results.sunrise);
                    var sunriseString = sunrise.substring(2);
                    var sunriseParseInt = parseInt(sunrise)-5;
                    var sunriseActual = sunriseParseInt + sunriseString;
                    $("#sunriseTime").text(sunriseActual);

                    var sunset = (sun.results.sunset);
                    // console.log(sun.results);
                    var sunsetString = sunset.substring(2);
                    var sunsetParseInt = parseInt(sunset)-5;
                    var sunsetActual = sunsetParseInt + sunsetString;
                    $("#sunsetTime").text(sunsetActual);
                    // $("#sunriseTime").html(`Sunrise:  ${}`);
                    // $("#sunsetTime").html(`Sunset:  ${sun.results.sunset}`);
                });
            })
                // console.log('weatherApiUrl: ',weatherAPIURL))
    }, -10)
};
var getCurrentLocation = function () {
    $.ajax({
        url: userLocationAPI,
        method: "GET"
    }).then(function (response) {
        // console.log("Coordination: ", response);
        // $("#weatherCity").html(response.city);
        // $("#weatherState").html(response.region_code);
        var latitude = response.latitude;
        var longitude = response.longitude;
        var state = response.region_code;
        getCurrentWeather(latitude, longitude, state); // pulling the Data
    });
}
getCurrentLocation(); // executing this function





