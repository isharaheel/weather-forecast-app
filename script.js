const mainDiv = document.getElementsByClassName('mainDiv')[0]; 
mainDiv.style.backgroundImage = 'url(./bg.jpg)';

const searchBtn = document.querySelector('.searchBtn');
const searchBar = document.getElementById('searchBar');

const inpDiv = document.getElementsByClassName('inpDiv')[0];

searchBtn.addEventListener('click', function () {
  let weatherInfocontainer = document.querySelector('.weatherInfo');

  if (!weatherInfocontainer) {
    weatherInfocontainer = document.createElement('div');
    weatherInfocontainer.className = 'weatherInfo';
    inpDiv.appendChild(weatherInfocontainer);
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=ef1e1959b91d7ba0b4c4b2e839d328c5&units=metric`)
    .then(res => res.json())
    .then(data => {showDataFromApi(data)
 searchBar.value = '';})
    .catch(err => {
      console.error("Fetch error:", err);
    });


});
function showDataFromApi(data) {
  const date = new Date();
  const todayDate = date.getDate();
  const weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDay = weekArr[date.getDay()];
  const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthsArray[date.getMonth()];
  const year = date.getFullYear();
  const time = date.toLocaleTimeString();

  const weatherInfocontainer = document.querySelector('.weatherInfo');

  let innerCode = '';
  innerCode += `<div class='createDiv'>
    <h1 class='nameHeading'>${data.name}, ${data.sys.country}</h1>
    <h2 class='timeHeading'>${time}</h2>
    <h3 class='dateDay'>${todayDate} ${monthName} [${weekDay}] ${year}</h3>
    <h4 class='tempHeading'>${Math.floor(data.main.temp)}°C</h4>
    <p class='minTemp'>${Math.floor(data.main.temp_min)}\u00B0c (min) ${Math.floor(data.main.temp_max)}\u00B0c (max)</p>
    <h5 class='weatherHeading'>${data.weather[0].main}</h5>
  </div>`;

  inpDiv.style.marginTop = '16%'
  weatherInfocontainer.innerHTML = innerCode;



if (data?.weather[0]?.main == 'Clear') {
    mainDiv.style.backgroundImage = 'url(./clearWeather.jpg)'
}else if(data.weather[0].main == 'Haze'){
    mainDiv.style.backgroundImage = 'url(./hazeWeather.jpg)'
}else if(data.weather[0].main == 'Rain'){
    mainDiv.style.backgroundImage = 'url(./rainWeather.jpg)'
}else if(data.weather[0].main == 'Clouds'){
    mainDiv.style.backgroundImage = 'url(./cloudyWeather.jpg)'
}else if(data.weather[0].main == 'Smoke'){
    mainDiv.style.backgroundImage = 'url(./smokeWallpaper.jpg)'
}else if(data.weather[0].main == 'Dust'){
    mainDiv.style.backgroundImage = 'url(./dustWeather.jpg)'
}else{
    mainDiv.style.backgroundImage = 'url(./bgImage.jpg)'
}

}



