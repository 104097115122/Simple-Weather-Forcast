const input = document.querySelector('input');
const button = document.querySelector('button');
const error_msg = document.querySelector('p.error_message');
const city_name = document.querySelector('h2.city_name');
const weather_img = document.querySelector('img.weather_img');
const temp = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const feels_like = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const wind_speed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');
const pollution_img = document.querySelector('img.pollution_img');
const pollution_value = document.querySelector('span.pollution_value');

const api_info = {
    link : 'https://api.openweathermap.org/data/2.5/weather?q=',
    key : '&appid=578cbfd15c887f058a89fa34e091c458',
    units : '&units=metric',
    lang : '&lang=es'
}



function getWeatherInfo () {
    const api_info_city = input.value;
    const URL = `${api_info.link}${api_info_city}${api_info.key}${api_info.units}${api_info.lang}`;
    
    axios.get(URL).then((response) => {
        console.log(response.data);

        city_name.textContent = `${response.data.name}`;
        temp.textContent = `${Math.round(response.data.main.temp)} °C`;
        weather_img.src = "https://openweathermap.org/img/wn/" + response.data.weather[0].icon +"@2x.png";
        description.textContent = `${response.data.weather[0].description}`;
        feels_like.textContent = `${response.data.main.feels_like} °C`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        wind_speed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
        visibility.textContent = `${response.data.visibility / 1000} km`;
        clouds.textContent = `${response.data.clouds.all} %`;
        error_msg.textContent = '';

        const URL_POLLUTION = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}${api_info.key}`;

        axios.get(URL_POLLUTION).then((res) => {
            
            pollution_value.textContent = `${res.data.list[0].components.pm2_5}`;
            
            const pollution_value_number = `${res.data.list[0].components.pm2_5}`;
            if (pollution_value_number < 10)
            {
                pollution_img.style.backgroundColor = 'green';
            }else if(pollution_value_number >= 10 && pollution_value_number < 25){
                pollution_img.style.backgroundColor = 'yellowgreen';
            }else if(pollution_value_number >= 25 && pollution_value_number < 50){
                pollution_img.style.backgroundColor = 'yellow';
            }else if(pollution_value_number >= 50 && pollution_value_number < 75){
                pollution_img.style.backgroundColor = 'orange';
            }else {
                pollution_img.style.backgroundColor = 'red';
            }
        })
    }).catch((error) => {
        error_msg.textContent = `${error.response.data.message}`;
        [city_name, temp, description, feels_like, pressure, humidity, wind_speed, visibility, clouds, pollution_value].forEach(element => {
            element.textContent = '';            
        })
        weather_img.src = '';
        pollution_img.style.backgroundColor = '';
    }).finally(() => {
        input.value = '';
    })
}

function getWeatherInfoByEnter(e) {
    if (e.key == 'Enter')
    {
        getWeatherInfo;
    }
}

button.addEventListener('click', getWeatherInfo);

input.addEventListener('keypress', getWeatherInfoByEnter)