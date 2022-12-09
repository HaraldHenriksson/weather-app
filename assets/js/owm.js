/**
 * OpenWeatherMap API
 */

 const API_KEY = "f3fbd5ed315e34c7939f83462496ce9d";
 const BASE_URL = "https://api.openweathermap.org/data/2.5";
 
 const FAKE_SLOW_API = true;
 const FAKE_SLOW_API_DELAY = 1000;
 
 const getCurrentWeather = async (city) => {
     // get weather for city from OpenWeatherMap API
     const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);

     FAKE_SLOW_API && await new Promise(r => setTimeout(r, FAKE_SLOW_API_DELAY));
 
     // check if response is ok
     if (!response.ok) {
         throw new Error(`${response.status} ${response.statusText}`);
     }
 
     const data = await response.json();
 
     return data;
 }
 