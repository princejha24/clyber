
const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
 const video = document.getElementById("backgroundVideo");
const apiKey="7d48bc6d37885caabf9b4dbde04c7a96";

weatherForm.addEventListener("submit",async event=>{

    event.preventDefault();
    const city=cityInput.value;

     if(city){
       try{
              const weatherData=await getWeatherData(city);
              displayWeatherInfo(weatherData);
       }
       catch(error){
        console.error(error);
        displayError("Please enter a valid city name");
     }
    }
     else{
        displayError("Please enter a city name");
     }
});

async function getWeatherData(city){

   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response=await fetch(apiUrl);

    if(!response.ok){
        throw new Error();
    }
    return await response.json();
}
function displayWeatherInfo(data){
   const{name:city,sys: { country }, main: {temp, humidity}, weather:[{id, description}]}=data;


   card.textContent="";
   card.style.display="flex";

    const cityDisplay=document.createElement("h1");
    cityDisplay.classList.add("cityDisplay");
    cityDisplay.textContent = `${city}, ${country}`;
    card.appendChild(cityDisplay);

    const tempDisplay=document.createElement("p");
    tempDisplay.classList.add("tempDisplay");
    tempDisplay.textContent=`${(temp).toFixed(1)}°C`;
    card.appendChild(tempDisplay);


    const humidityDisplay=document.createElement("p");
    humidityDisplay.classList.add("humidityDisplay");
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    card.appendChild(humidityDisplay);

    const descDisplay=document.createElement("p");
    descDisplay.classList.add("descDisplay");
    descDisplay.textContent=description;
    card.appendChild(descDisplay);

    const weatherEmoji=document.createElement("p");
    weatherEmoji.classList.add("weatherEmoji");
    weatherEmoji.textContent=getWeatherEmoji(id);
    card.appendChild(weatherEmoji);
    changeBackgroundVideo(id);

}

function getWeatherEmoji(weatherId){

    if(weatherId>=200 && weatherId<300){
        return "⛈️"; // Thunderstorm
    }
    else if(weatherId>=300 && weatherId<500){
        return "🌦️"; // Drizzle
    }
    else if(weatherId>=500 && weatherId<600){
        return "🌧️"; // Rain
    }
    else if(weatherId>=600 && weatherId<700){
        return "❄️"; // Snow
    }
    else if(weatherId>=700 && weatherId<800){
        return "🌫️"; // Atmosphere
    }
    else if(weatherId===800){
        return "☀️"; // Clear
    }
    else if(weatherId>800 && weatherId<900){
        return "☁️"; // Clouds
    }
    else{
        return "🌈"; // Default/Fallback
    }


}
function changeBackgroundVideo(weatherId) {
    if (!video) return;

    if (weatherId >= 200 && weatherId < 300) {
        video.src = "video/thunderstorm.mp4"; // Thunderstorm
       //card.style.opacity="0.2";
    }
    else if (weatherId >= 300 && weatherId < 500) {
        video.src = "video/drizzle.mp4"; // Drizzle
        //card.style.opacity="0.25";
    }
    else if (weatherId >= 500 && weatherId < 600) {
        video.src = "video/rain.mp4"; // Rain
        //card.style.opacity="0.25";
    }
    else if (weatherId >= 600 && weatherId < 700) {
        video.src = "video/snow.mp4"; // Snow
        //card.style.opacity="0.25";
    }
    else if (weatherId >= 700 && weatherId < 800) {
        video.src = "video/atmosphere.mp4"; // Fog, mist, etc.
       // card.style.opacity="0.25";
    }
    else if (weatherId === 800) {
        video.src = "video/clearsky.mp4"; // Clear sky
       //card.style.opacity="0.25";
    }
    else if (weatherId > 800 && weatherId < 900) {
        video.src = "video/clo.mp4"; // Clouds
       //card.style.opacity="0.9";
    }
    else {
        video.src = "video/normal.mp4"; // Fallback
    }

    video.play();
}

function displayError(message){

    const errorDisplay=document.createElement("p")
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);

    if (video) {
        video.src = "video/normal.mp4"; 
        video.play();
    }

}