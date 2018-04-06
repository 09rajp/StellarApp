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
                    $("#sunriseTime").text("Sunrise Time: " + sunriseActual);
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


var quiz = [
    "Saturn would float if you would put it in water.",
    "If you would place a pinhead sized piece of the Sun on the Earth you would die from standing within 145 km (90 miles) from it.",
    "Space is not a complete vacuum, there are about 3 atoms per cubic meter of space.",
    "Only 5% of the universe is made up of normal matter, 25% is dark matter and 70% is dark energy.",
    "Neutron stars are so dense that a teaspoon of them would be equal to the weight of the entire Earth’s population.",
    "The Sun is 400 times larger than the Moon but is 400 times further away from Earth making them appear the same size.",
    "The star Lucy in the constellation Centaurus is a huge cosmic diamond of 10 billion trillion trillion carats.",
    "Seasons last 21 years on Uranus while each pole has 42 years of sunlight followed by 42 years of darkness.",
    "Venus,on the other hand, does not have any seasons at all.",
    "1 year on Mercury consists of less than 2 days on Mercury.",
    "There are as many oxygen atoms in a breath as breaths of air in the atmosphere.",
    "Helium is the only substance in the universe that cannot be in solid form.It can’t be cold enough.",
    "The coldest place in the universe is on Earth. In Wolfgang Ketterles lab in Massachusetts. 0.000000000001 degrees Kelvin.",
    "The pistol star is the most luminous star known 10 million times the brightness of the Sun.",
    "Saturn’s moon Titan has liquid oceans of natural gas.",
    "All the planets are the same age: 4.544 billion years.",
    "Earths moon was most likely formed after an early planet named Theia crashed into Earth.",
    "8000 stars are visible with naked eye from Earth. 4000 in each hemisphere, 2000 at daylight and 2000 at night.",
    "90-99% of all normal matter in the universe is hydrogen.",
    "Because of the speed the Sun moves at, solar eclipses can last at most 7 minutes and 58 seconds.",
    "Lunar eclipses, however, can last 1 hour and 40 minutes.",
    "All the coal, oil, gas, wood and fuel on Earth would only keep the Sun burning for few days.",
    "A full moon is nine times brighter than a half moon.",
    "When the Moon is directly above your head or if you stand at the equator, you weight slightly less.",
    "A single Quasar produce the same amount of energy as 1 trillion suns.",
    "Just after the Big Bang, everything in the universe was in liquid form.",
    "A planet nicknamed “The Genesis Planet” has been found to be 12.7 billion years old making it the oldest planet found.",
    "The shape of the universe looks a lot like a brain cell.",
    "Every year, the Moon is moving away from Earth by 3.8 centimeters.",
    "The Moon spins around its axis in the same time it goes one lap around the Earth which makes us always see the same side of it.",
    "Upsilon Andromeda B also only face one side to its star. One side is hot as lava while the other one is cold below freezing.",
    "The average galaxy contains “only” 40 billion stars.",
    "While in space astronomers can get taller, but at the same time their hearts can get smaller.",
    "Mars surface is cowered with iron oxide (rust).",
    "Only half a billionth of the energy released by the Sun reaches Earth.",
    "Rogue planets are not bound by any star, brown dwarf or another planet which makes them free-float around the galaxy.",
    "Sweeps 10 is the planet with the shortest orbital period found. It orbits its star in only 10 hours.",
    "85% of all stars in our galaxy are part of multiple-star systems.",
    "Some brown dwarfs have liquid iron rain falling down on them.",
    "The light emitting from the Sun is actually 30.000 years old.",
    "Of the over 20 million meteors that are observable every day only one or two reach the surface of Earth.",
    "The United States have approximately 3,500 astronomers, but over 15,000 astrologers.",
    "The closest black hole to Earth is only 1.600 light-years away.",
    "There are at least 10^24 stars in the universe.",
    "Certain “star quakes” have been found to tear apart the surface of neutron stars.",
    "Any free-moving liquid in outer space will form itself into a sphere due to surface tension.",
    "The odds of being killed by falling space debris is 1 in 5 billion.",
    "Neutron stars can rotate up to 500 times in 1 second.",
    "The largest structure found in the universe is the Sloan Great Wall, a super cluster of galaxies 1.37 billion light-years wide.",
];


$("#Submit").on("click", function() {

    $.each(quiz, function(i,e) {
        setTimeout(function() {
            var pTag = $("<p>", {text: e});
                time = (i*3000)+(quiz.length*3000);
                $("#main-content").empty();
            $("#main-content").append(pTag)
            setTimeout(function() {
                // pTag.css('color', 'lightblue').prev('span').css('color', 'white');
            },time );
        }, i*3000);
    });

});