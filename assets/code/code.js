//Position
const positionPanel = document.querySelector(".position__city");
const dateTimePanel = document.querySelector(".position__date-time");

//Weather
const weatherTempPanel = document.querySelector(".current-weather__temp");
const weatherIconPanel = document.querySelector(".current-weather__desc_icon");
const weatherFeelsPanel = document.querySelector(".current-weather__desc_feels-like");
const weatherWindPanel = document.querySelector(".current-weather__desc_wind");
const weatherHumPanel = document.querySelector(".current-weather__desc_humidity");

class WeatherApp {
    constructor(posPanel, tempPanel, iconPanel, feelsPanel, windPanel, humPanel) {
        this.currentTempPanel = tempPanel;
        this.positionPanel = posPanel;
        this.iconPanel = iconPanel;
        this.feelsPanel = feelsPanel;
        this.windPanel = windPanel;
        this.humPanel = humPanel;
        this.init();
        
}

    init() {
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

    async getWeather(lat, lng, lang='RU', units = 'metric') {
        try {
            // let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&lang=${lang}&appid=88e88696d2cb8276e58d14f4ac3a0362`);
            let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${units}&lang=${lang}&exclude=minutely,hourly&appid=88e88696d2cb8276e58d14f4ac3a0362`);
            let weather = await response.json();
            this.weather = weather;
            console.log(this.weather);
        } catch (err) {
            console.log('weather err: ', err)
        }
    }

    async getWeatherByCity() {}

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



const weather = new WeatherApp(positionPanel, weatherTempPanel, weatherIconPanel, weatherFeelsPanel, weatherWindPanel, weatherHumPanel);

