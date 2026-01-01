
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const hour_box = document.getElementById("hour");
const min_box = document.getElementById("min");
const sec_box = document.getElementById("sec");
const ampm_box = document.getElementById("ampm");
const greeting = document.getElementById("greet");
const background = document.getElementById("background");
const calendar = document.getElementById("calendar");

// Greeting messages
const greetings = {
  morning: [
    "☀ Good Morning – Rise and Shine!",
    "🌅 Morning! Time for a fresh start!",
    "☕ Grab your coffee and smile!"
  ],
  afternoon: [
    "🌤 Good Afternoon – Keep Going!",
    "🍽 Lunch Time! Recharge Yourself!",
    "💼 Stay productive this afternoon!"
  ],
  evening: [
    "🌙 Good Evening – Relax a bit!",
    "🌆 Enjoy the sunset and unwind!",
    "💫 Evening vibes – Reflect on your day!"
  ],
  night: [
    "🌌 Good Night – Sweet Dreams!",
    "🛌 Time to Sleep – Recharge!",
    "⭐ The stars are shining for you!"
  ]
};

function updateClock() {
  const date = new Date();
  let hours = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  const zero_h = hours < 10 ? "0" : "";
  const zero_m = min < 10 ? "0" : "";
  const zero_s = sec < 10 ? "0" : "";

  hour_box.innerHTML = `${zero_h}${hours}`;
  min_box.innerHTML = `${zero_m}${min}`;
  sec_box.innerHTML = `${zero_s}${sec}`;
  ampm_box.innerHTML = ampm;

  // Calendar
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dated = date.getDate();
  const year = date.getFullYear();
  calendar.innerHTML = `${day} - ${month} ${dated}, ${year}`;

  // Greetings
  let timeMessage = "Digital Clock";
  if(date.getHours() >= 5 && date.getHours() <= 11){
    timeMessage = greetings.morning[Math.floor(Math.random() * greetings.morning.length)];
    background.style.backgroundImage = "url('./image/mor.jpg')";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  } 
  else if(date.getHours() >= 12 && date.getHours() <= 16){
    timeMessage = greetings.afternoon[Math.floor(Math.random() * greetings.afternoon.length)];
    background.style.backgroundImage = "url('./image/afternoon.jpg')";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  }
   else if(date.getHours() >= 17 && date.getHours() <= 19){
    timeMessage = greetings.evening[Math.floor(Math.random() * greetings.evening.length)];
    background.style.backgroundImage = "url('./image/eve.jpg')";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  } 
  else {
    timeMessage = greetings.night[Math.floor(Math.random() * greetings.night.length)];
    background.style.backgroundImage = "url('./image/night.jpg')";
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
  }

  greeting.innerHTML = timeMessage;
}

// Run every second
setInterval(updateClock, 1000);
updateClock(); // initial call


const apiKey="a3cd89049ffaf0d2155f25c0bb7c2968";
const city="Tenkasi";


function fetchWeather(){
  fetch(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
  .then(res=>res.json())
  .then(data=>{
    if(data.error){
      console.log("Weather Error:",data.error.info);
      return;
    }
    const temp=data.current.temperature;
    const condition=data.current.weather_descriptions[0];
    const icons = {
      "Clear": "☀️",
      "Sunny": "☀️",
      "Partly cloudy": "⛅",
      "Clouds": "☁️",
      "Overcast": "☁️",
      "Rain": "🌧️",
      "Drizzle": "🌦️",
      "Snow": "❄️",
      "Haze": "🌫️",
      "Fog": "🌫️",
      "Thunderstorm": "⛈️",
      "Mist": "🌫️"
    };
    const icon=icons[condition] || "🌡️";


    document.getElementById("temp").innerHTML=`${icon} ${temp}°C`;
    document.getElementById("condition").innerHTML=`- ${condition}`;
  })
  .catch(err=>{
    console.log("Fetch error:",err);
  });
}
fetchWeather();
