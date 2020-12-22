//Position
const positionPanel = document.querySelector(".position__city");
const datePanel = document.querySelector(".position__date-time_date");
const timePanel = document.querySelector(".position__date-time_time");
console.log(datePanel, timePanel)

//Weather
const weatherTempPanel = document.querySelector(".current-weather__temp");
const weatherIconPanel = document.querySelector(".current-weather__desc_icon");
const weatherFeelsPanel = document.querySelector(".current-weather__desc_feels-like");
const weatherWindPanel = document.querySelector(".current-weather__desc_wind");
const weatherHumPanel = document.querySelector(".current-weather__desc_humidity");
const forecastPanels = document.querySelectorAll(".forecast__day");
class WeatherApp {
    constructor(posPanel, datePanel, timePanel, tempPanel, iconPanel, feelsPanel, windPanel, humPanel, frcPanels) {
        this.currentTempPanel = tempPanel;
        this.positionPanel = posPanel;
        this.datePanel = datePanel;
        this.timePanel = timePanel;
        this.iconPanel = iconPanel;
        this.feelsPanel = feelsPanel;
        this.windPanel = windPanel;
        this.humPanel = humPanel;
        this.frcPanels = frcPanels;
        this.init();

    }

    init() {
        this.renderDate();
        const renderTime = this.renderTime.bind(this);
        setInterval(renderTime, 1000);
        this.getCoordsByIP()
            .then(() => {
                this.coords = this.loc.loc.split(',').reverse();
                let mapCenter = this.coords;
                this.createMap(mapCenter);
            }).then(() => {
                this.getWeather(this.coords[1], this.coords[0]).then(() => {
                    console.log(this.loc);
                    this.renderApp();
                });
            });
    }

    renderApp() {
        this.currentTempPanel.innerHTML = `<p>${this.weather.current.temp}</p>`;
        this.positionPanel.textContent = this.loc.city + this.loc.country;
        this.iconPanel.innerHTML = `<img src="http://openweathermap.org/img/wn/${this.weather.current.weather[0].icon}@2x.png"><p>${this.weather.current.weather[0].description}</p>`;
        this.feelsPanel.textContent = `Feels like ${Math.round(this.weather.current.feels_like)}`;
        this.windPanel.textContent = `${this.weather.current.wind_speed}, ${this.weather.current.wind_deg} deg`;
        this.humPanel.textContent = `${this.weather.current.humidity} %`;
        this.renderForecast(this.frcPanels);
        
    }

    renderForecast(listOfElements) {
        let dayCounter = 1;
        listOfElements.forEach((panel) => {
            let day = new Date(this.weather.daily[dayCounter].dt * 1000);
            let forecast = `
            <h3>${this.generateDay(day.getDay())}</h2>
            <div>
            <div>${Math.round(this.weather.daily[dayCounter].temp.day)}</div>
            <div><img src="http://openweathermap.org/img/wn/${this.weather.daily[dayCounter].weather[0].icon}@2x.png"></div>
            </div>
            `;
            panel.innerHTML = forecast;
            ++dayCounter;
        });
    }

    renderDate() {
        let now = new Date();
        let days = now.getDate();
        let month = now.getMonth();
        let year = now.getFullYear();
        days < 10 ? days = '0' + days : days;
        month < 10 ? month = '0' + month : month;
        this.datePanel.innerHTML = `${days}:${month}:${year}`;
    }

    renderTime() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        hours < 10 ? hours = '0' + hours : hours;
        minutes < 10 ? minutes = '0' + minutes : minutes;
        seconds < 10 ? seconds = '0' + seconds : seconds;
        this.timePanel.innerHTML = `${hours}:${minutes}:${seconds}`;
    };


    generateDay(day) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];
        return days[day];
    }

    async getCoordsByIP() {
        try {
            let response = await fetch('https://ipinfo.io?token=be43892ad62096');
            let coords = await response.json();
            this.loc = coords;
        } catch (err) {
            console.log('coords err: ', err);
        }
    }

    async getWeather(lat, lng, lang = 'RU', units = 'metric') {
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${units}&lang=${lang}&exclude=minutely,hourly&appid=88e88696d2cb8276e58d14f4ac3a0362`);
            let weather = await response.json();
            this.weather = weather;
            console.log(this.weather);
        } catch (err) {
            console.log('weather err: ', err)
        }
    }

    async getWeatherByCity() { }

    createMap(mapCenter) {
        new mapboxgl.Map({
            accessToken: 'pk.eyJ1IjoieXVyYWt1em1pY2giLCJhIjoiY2pzMGxmcWk0MWt5dDN5bzMxY2V1MDA3aCJ9.uWl284AonDQe4NK9ISlOjQ',
            container: 'map-box',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: mapCenter, // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
    }

    // getCoords() {
    //     function success(position) {
    //         return position;
    //     }

    //     function error() {
    //         alert('error');
    //     }
    //     if (!navigator.geolocation) {
    //         return 'Geolocation is not awalible';
    //     } else {
    //         navigator.geolocation.getCurrentPosition(success, error);
    //     }
    // }
}



const weather = new WeatherApp(positionPanel, datePanel, timePanel, weatherTempPanel, weatherIconPanel, weatherFeelsPanel, weatherWindPanel, weatherHumPanel, forecastPanels);

