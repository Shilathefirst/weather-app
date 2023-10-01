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
  
  function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
  }
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 66;
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 19;
  }
  
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
  
  function displayWeather(response){
    let temperature= Math.round(response.data.main.temp);
    let temperatureId= document.querySelector("#temp");
    temperatureId.innerHTML=`${temperature}`;
    let cityId= document.querySelector("#city");
    cityId.innerHTML = response.data.name;
    let weatherDes = document.querySelector("#weatherDes");
    weatherDes.innerHTML = response.data.weather[0].description;
    
  }
  function getPosition(position) {
    let apiKey = "5354b60afda2b7800186c06153932396";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeather);
  }
  function getCurrentPosition(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getPosition);
  
  }
  