class WeatherApp {
    constructor() {
        this.getCoordsByIP()
            .then(() => {
                this.coords = this.loc.loc.split(',').reverse();
                let mapCenter = this.coords;
                this.createMap(mapCenter);
            });
    }

    renderApp() {

    }

    getWeather() {

    }

    async getCoordsByIP() {
        try {
            let response = await fetch('https://ipinfo.io?token=be43892ad62096');
        let coords = await response.json();
        this.loc = coords;
        } catch (err) {
            alert(err);
        }     
    }

    async getWeather (lat, lng) {
        try {
            let response = await fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=88e88696d2cb8276e58d14f4ac3a0362`);
            let weather = await response.json();
            this.weather = weather;
        } catch (err) {
            alert(err)
        }
    }

    createMap(mapCenter) {
        var map = new mapboxgl.Map({
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



const weather = new WeatherApp();

