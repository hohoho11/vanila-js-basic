const COORDS = 'coords';
const API_KEY = "60fbc94935b266a50e053fb98ba522c5";
// 60fbc94935b266a50e053fb98ba522c5
const weatherDOM = document.querySelector(".js-weather");

function getWeather(lat, lon) {
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
    .then(function(res) {
        return res.json()
    }).then(function(json) {
        console.log(json);
        const temp = json.main.temp;
        const place = json.name;
        const weather = json.weather[0].description;
        const weatherIcon = json.weather[0].icon;
        weatherDOM.innerHTML = `${temp} @ ${place} @ ${weather} @ <img src='http://openweathermap.org/img/wn/${weatherIcon}.png' />`
    })
}

function saveCoords(coordObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = {
        latitude
        ,longitude
        
    }
    saveCoords(coords);
    handleGeoSuccess(latitude,longitude)
}

function handleGeoError() {
    console.log("cant GEO");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null) {
        askForCoords();
    }else {
        const parsedCords = JSON.parse(loadedCords);
        console.log(parsedCords);
        getWeather(parsedCords.latitude,parsedCords.longitude)
    }
}

function init() {
    loadCoords()
}

init();