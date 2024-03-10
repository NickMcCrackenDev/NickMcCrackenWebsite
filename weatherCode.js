


function getWeather(){
    const apiKey = 'f25009a6569694250e786b5d21543998'
    var city = document.getElementById('city').value;

    if (!city){
        alert('Please enter a city');
        return;
    }

    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(Response => Response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error =>{
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

        fetch(forecastUrl)
            .then(Response => Response.json())
            .then(data => {
                displayHourlyForecast(data.list);
            })
            .catch(error =>{
                console.error('Error fetching hourly forecast data:', error);
                alert('Error fetching hourly forecast data. Please try again.');
            });
}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temperatureDiv');
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const weatherIcon = document.getElementById('weatherIcon');
    const hourlyForecastDiv = document.getElementById('hourlyForecast');

    // Clear prev content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }
    else{
        const cityName = data.name;
        const temperature = (Math.round(data.main.temp - 273.15)*1.8)+32;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°F</p>`;
        const weatherHTML = `
        <p>${cityName}</p>
        <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourlyForecast');
    const next24Hours = hourlyData.slice(0,8);
    var amPM = false;
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        var hour = dateTime.getHours();
        if(dateTime.getHours() > 12){
            hour = hour - 12;
            amPM = true;
        }
        else{
            amPM = false;
        }
        const temperatureForecast = (Math.round(item.main.temp - 273.15)*1.8)+32;
        const iconCode = item.weather[0].icon;
        const iconUrlForecast = `https://openweathermap.org/img/wn/${iconCode}.png`;

        var hourlyItemHTML;
        if(amPM == true){
           hourlyItemHTML = `
            <div class= "hourlyItem">
                <span>${hour}:00 PM</span>
                <img src="${iconUrlForecast}" alt="Hourly Weather Icon">
                <span>${temperatureForecast}°F</span>
            </div>
        `; 
        } 
        else{
            hourlyItemHTML = `
            <div class= "hourlyItem">
                <span>${hour}:00 AM</span>
                <img src="${iconUrlForecast}" alt="Hourly Weather Icon">
                <span>${temperatureForecast}°F</span>
            </div>
        `; 
        }
        hourlyForecastDiv.innerHTML += hourlyItemHTML;

    });

}

function showImage(){
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.style.display = 'block';


}