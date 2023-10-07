function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  function getForecast(coordinates){
    
    let apiKey = "9o3f07553f5a06d0b934dt0775693144";
    let apiUrl =`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
   
   axios.get(apiUrl).then(displayForecast);
  }
  function displayWeather(response) {
    

    celciusTemp = response.data.temperature.current;
    
    document.querySelector("#city").innerHTML = response.data.city;
    document.querySelector("#temp").innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#weatherDes").innerHTML = response.data.condition.description;
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#icon").setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
     getForecast(response.data.coordinates);
  }

  function searchCity(city) {
    let apiKey = "9o3f07553f5a06d0b934dt0775693144";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  function getPosition(position) {
    let apiKey = "9o3f07553f5a06d0b934dt0775693144";
    let url = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(url).then(displayWeather);
  }
  
 
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  let celsiusLink = document.querySelector("#celsius-link");
 function displayFahrenheitTemp(event){
   event.preventDefault();
   let fahrenheitTemp =(celciusTemp* 9) / 5 + 32 ;
   let temperatureElement = document.querySelector("#temp");
   temperatureElement.innerHTML = Math.round(fahrenheitTemp);
 }
 function displayCelsiusTemp(event){
   event.preventDefault();
   let temperatureElement = document.querySelector("#temp");
   temperatureElement.innerHTML = Math.round(celciusTemp);

 }
  fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
  celsiusLink.addEventListener("click",displayCelsiusTemp);
  let celciusTemp = null;
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];


    return days[day];
  }
  function displayForecast(response){
    let forecast= response.data.daily;
    
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days =["Thu","Fri","Sat","Sun","Mon"];
    forecast.forEach(function(forecastDay,index){
      
      if(index<6){
      forecastHTML = forecastHTML + `
      
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt=" " width="35" />
         <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max">${Math.round(forecastDay.temperature.maximum)}&deg
          </span>
          <span class="weather-forecast-temp-min">
            ${Math.round(forecastDay.temperature.minimum)}&deg
          </span>
       
         </div>
        
        </div>
     
    
   `;
    }});
   forecastHTML = forecastHTML + ` </div>`;
   forecastElement.innerHTML = forecastHTML;
  }
  searchCity("Pretoria");

  