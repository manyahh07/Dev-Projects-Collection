async function getWeather(){

let city=document.getElementById("city").value;

let apiKey="YOUR_API_KEY";

let url=
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

let response=await fetch(url);

let data=await response.json();

document.getElementById("result").innerHTML=`

<h2>${data.name}</h2>

<p>🌡 Temp: ${data.main.temp}°C</p>

<p>💧 Humidity: ${data.main.humidity}%</p>

<p>🌬 Wind: ${data.wind.speed} m/s</p>

<p>${data.weather[0].description}</p>

`;

}