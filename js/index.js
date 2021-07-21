
//geo-location
const successcallback=(position)=>{
    console.log(position);
    weatherforcast.style.height="auto";
    let latt=position.coords.latitude;
    let long=position.coords.longitude;
    let finallat=(Math.round(latt * 100) / 100).toFixed(2);
    let finallon=(Math.round(long * 100) / 100).toFixed(2);
    fetch(`${currentweatherapi.url}lat=${finallat}&lon=${finallon}&appid=${currentweatherapi.key}&units=metric`)
    .then(weather=>{
        return weather.json();
    }).then(showWeatherData);
};

const errorcallback=(error)=>{
    console.error(error);
};

navigator.geolocation.getCurrentPosition(successcallback,errorcallback);

// functionality of the hamburger-->
let navbar=document.querySelector(".navbar");
let search=document.querySelector(".search");
Hamburger.addEventListener("click",()=>{
    search.classList.toggle("v-nav");
    navbar.classList.toggle("h-nav");
});

//functionality of application logo-->
sunlogo.addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition(successcallback,errorcallback);
});

//js for current weather searching-->
const currentweatherapi={
    key: "21c81e8d54ef0829908c6d9839824ac0",
    url: "https://api.openweathermap.org/data/2.5/weather?"
}

const forecastapi={
    key: "21c81e8d54ef0829908c6d9839824ac0",
    url:"https://api.openweathermap.org/data/2.5/onecall?"
}

//event listeners for which the the fetching process is done
placename.addEventListener("keypress", (event)=>{
    if(event.keyCode==13){
        currentWeatherDate(placename.value);
        search.classList.toggle("v-nav");
        navbar.classList.toggle("h-nav");
        placename.value="";
        weatherforcast.style.height="auto";
    }
});

searchbox.addEventListener("click",()=>{
    currentWeatherDate(placename.value);
    search.classList.toggle("v-nav");
    navbar.classList.toggle("h-nav");
    placename.value="";
});


//data fetch from the api
function currentWeatherDate(city){
    fetch(`${currentweatherapi.url}q=${city}&appid=${currentweatherapi.key}&units=metric`)
    .then(weather=>{
        return weather.json();
    }).then(showWeatherData);
};

//for showing weather data
function showWeatherData(weather) {
    console.log(weather);
    city.innerText=`${weather.name}, ${weather.sys["country"]}`;
    temparature.innerHTML=`${weather.main["temp"]}&deg;C`;
    wind.innerText=`Wind Speed-${weather.wind["speed"]}meter/sec.`;
    feel.innerHTML=`Feels Like-${weather.main["feels_like"]}&deg;C`;
    humidity.innerText=`Humidity-${weather.main["humidity"]}%`;
    pressure.innerHTML=`Pressure-${weather.main.pressure}mBar`;
    weathertype.innerText=`${weather.weather[0].main}`;
    imgdiv.innerHTML=`<img class="weathericon" id="weathericon" src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="WEATHER ICON">`
    let todaydate=new Date();
    date.innerHTML=datemanage(todaydate);
    time.innerHTML=timemanage(todaydate);
    weatherforecast(weather);

    //showing proper background
    if (weathertype.textContent == "Clear") {
        current.style.background=" #11999e";
    } else if (weathertype.textContent == "Clouds") {
        current.style.background=" #11999e";
    } else if (weathertype.textContent == "Haze") {
        current.style.background=" #11999e";
    } else if (weathertype.textContent == "Mist") {
        current.style.background=" #11999e";
    } else if (weathertype.textContent == "Rain") {
        current.style.background=" #11999e ";
    } else if (weathertype.textContent == "Smoke") {
        current.style.background=" #11999e";
    } else if (weathertype.textContent == "Snow") {
        current.style.background=" #11999e";
    } else if (weathertype.textContent == "Fog") {
        current.style.background=" #11999e";
    } else if (weathertype.textContent == "Thunderstorm") {
        current.style.background=" #11999e";
    } else {
        current.style.background=" #11999e";
    }
}

//for managing the date
function datemanage(today) {
    let days=new Array(7);
    days[0] = "Sunday";
    days[1] = "Monday";
    days[2] = "Tuesday";
    days[3] = "Wednesday";
    days[4] = "Thursday";
    days[5] = "Friday";
    days[6] = "Saturday";
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    let date=today.getDate();
    let year=today.getFullYear();
    let day=today.getDay();
    let mon=today.getMonth();
    return `${date} ${month[mon]} (${days[day]}), ${year}`;
}

//for managing time
function timemanage(totime) {
    let periods="AM";
    let hours=totime.getHours();
    let minutes=totime.getMinutes();
    if(hours>11){
    periods="PM";
    if(hours>12) hours-=12;
    }
    if(minutes<10){
    minutes="0"+ minutes;
    }
    return `${hours}:${minutes}${periods}`;
}

//js for the forecast of the searched one-->
function weatherforecast(weather){
     longitute=weather.coord.lon;
     lattitude=weather.coord.lat;
     //console.log(longitute);
     fetch(`${forecastapi.url}lat=${lattitude}&lon=${longitute}&exclude=hourly,minutely,current&appid=${forecastapi.key}&units=metric`)
     .then(forecast=>{
        return forecast.json();
    }).then(showforecastData);
}

//showing forecast data
function showforecastData(forecast) {
    console.log(forecast);
    //Date manipulation
    dt1=new Date(forecast.daily[0].dt*1000);
    date1.innerHTML=datemanage(dt1);
    dt2=new Date(forecast.daily[1].dt*1000);
    date2.innerHTML=datemanage(dt2);
    dt3=new Date(forecast.daily[2].dt*1000);
    date3.innerHTML=datemanage(dt3);
    dt4=new Date(forecast.daily[3].dt*1000);
    date4.innerHTML=datemanage(dt4);
    dt5=new Date(forecast.daily[4].dt*1000);
    date5.innerHTML=datemanage(dt5);
    dt6=new Date(forecast.daily[5].dt*1000);
    date6.innerHTML=datemanage(dt6);
    dt7=new Date(forecast.daily[6].dt*1000);
    date7.innerHTML=datemanage(dt7);
    dt8=new Date(forecast.daily[7].dt*1000);
    date8.innerHTML=datemanage(dt8);
    
    //Time manipulation
    rise1=new Date(forecast.daily[0].sunrise*1000);
    set1=new Date(forecast.daily[0].sunset*1000);
    riseset1.innerText=`Sunrise-${timemanage(rise1)} / Sunset-${timemanage(set1)}`;
    rise2=new Date(forecast.daily[1].sunrise*1000);
    set2=new Date(forecast.daily[1].sunset*1000);
    riseset2.innerText=`Sunrise-${timemanage(rise2)} / Sunset-${timemanage(set2)}`;
    rise3=new Date(forecast.daily[2].sunrise*1000);
    set3=new Date(forecast.daily[2].sunset*1000);
    riseset3.innerText=`Sunrise-${timemanage(rise3)} / Sunset-${timemanage(set3)}`;
    rise4=new Date(forecast.daily[3].sunrise*1000);
    set4=new Date(forecast.daily[3].sunset*1000);
    riseset4.innerText=`Sunrise-${timemanage(rise4)} / Sunset-${timemanage(set4)}`;
    rise5=new Date(forecast.daily[4].sunrise*1000);
    set5=new Date(forecast.daily[4].sunset*1000);
    riseset5.innerText=`Sunrise-${timemanage(rise5)} / Sunset-${timemanage(set5)}`;
    rise6=new Date(forecast.daily[5].sunrise*1000);
    set6=new Date(forecast.daily[5].sunset*1000);
    riseset6.innerText=`Sunrise-${timemanage(rise6)} / Sunset-${timemanage(set6)}`;
    rise7=new Date(forecast.daily[6].sunrise*1000);
    set7=new Date(forecast.daily[6].sunset*1000);
    riseset7.innerText=`Sunrise-${timemanage(rise7)} / Sunset-${timemanage(set7)}`;
    rise8=new Date(forecast.daily[7].sunrise*1000);
    set8=new Date(forecast.daily[7].sunset*1000);
    riseset8.innerText=`Sunrise-${timemanage(rise8)} / Sunset-${timemanage(set8)}`;


    daynight1.innerHTML=`Day-${forecast.daily[0].temp.day}&deg;C / Night-${forecast.daily[0].temp.night}&deg;C`;
    daynight2.innerHTML=`Day-${forecast.daily[1].temp.day}&deg;C / Night-${forecast.daily[1].temp.night}&deg;C`;
    daynight3.innerHTML=`Day-${forecast.daily[2].temp.day}&deg;C / Night-${forecast.daily[2].temp.night}&deg;C`;
    daynight4.innerHTML=`Day-${forecast.daily[3].temp.day}&deg;C / Night-${forecast.daily[3].temp.night}&deg;C`;
    daynight5.innerHTML=`Day-${forecast.daily[4].temp.day}&deg;C / Night-${forecast.daily[4].temp.night}&deg;C`;
    daynight6.innerHTML=`Day-${forecast.daily[5].temp.day}&deg;C / Night-${forecast.daily[5].temp.night}&deg;C`;
    daynight7.innerHTML=`Day-${forecast.daily[6].temp.day}&deg;C / Night-${forecast.daily[6].temp.night}&deg;C`;
    daynight8.innerHTML=`Day-${forecast.daily[7].temp.day}&deg;C / Night-${forecast.daily[7].temp.night}&deg;C`;
    maxmin1.innerHTML=`Max-${forecast.daily[0].temp.max}&deg;C / Min-${forecast.daily[0].temp.min}&deg;C`;
    maxmin2.innerHTML=`Max-${forecast.daily[1].temp.max}&deg;C / Min-${forecast.daily[1].temp.min}&deg;C`;
    maxmin3.innerHTML=`Max-${forecast.daily[2].temp.max}&deg;C / Min-${forecast.daily[2].temp.min}&deg;C`;
    maxmin4.innerHTML=`Max-${forecast.daily[3].temp.max}&deg;C / Min-${forecast.daily[3].temp.min}&deg;C`;
    maxmin5.innerHTML=`Max-${forecast.daily[4].temp.max}&deg;C / Min-${forecast.daily[4].temp.min}&deg;C`;
    maxmin6.innerHTML=`Max-${forecast.daily[5].temp.max}&deg;C / Min-${forecast.daily[5].temp.min}&deg;C`;
    maxmin7.innerHTML=`Max-${forecast.daily[6].temp.max}&deg;C / Min-${forecast.daily[6].temp.min}&deg;C`;
    maxmin8.innerHTML=`Max-${forecast.daily[7].temp.max}&deg;C / Min-${forecast.daily[7].temp.min}&deg;C`;
    humidity1.innerText=`Humidity-${forecast.daily[0].humidity}%`;
    humidity2.innerText=`Humidity-${forecast.daily[1].humidity}%`;
    humidity3.innerText=`Humidity-${forecast.daily[2].humidity}%`;
    humidity4.innerText=`Humidity-${forecast.daily[3].humidity}%`;
    humidity5.innerText=`Humidity-${forecast.daily[4].humidity}%`;
    humidity6.innerText=`Humidity-${forecast.daily[5].humidity}%`;
    humidity7.innerText=`Humidity-${forecast.daily[6].humidity}%`;
    humidity8.innerText=`Humidity-${forecast.daily[7].humidity}%`;
    wind1.innerText=`Wind Speed-${forecast.daily[0].wind_speed}meter/sec.`;
    wind2.innerText=`Wind Speed-${forecast.daily[1].wind_speed}meter/sec.`;
    wind3.innerText=`Wind Speed-${forecast.daily[2].wind_speed}meter/sec.`;
    wind4.innerText=`Wind Speed-${forecast.daily[3].wind_speed}meter/sec.`;
    wind5.innerText=`Wind Speed-${forecast.daily[4].wind_speed}meter/sec.`;
    wind6.innerText=`Wind Speed-${forecast.daily[5].wind_speed}meter/sec.`;
    wind7.innerText=`Wind Speed-${forecast.daily[6].wind_speed}meter/sec.`;
    wind8.innerText=`Wind Speed-${forecast.daily[7].wind_speed}meter/sec.`;
    weather1.innerText=`${forecast.daily[0].weather[0].main}`;
    weather2.innerText=`${forecast.daily[1].weather[0].main}`;
    weather3.innerText=`${forecast.daily[2].weather[0].main}`;
    weather4.innerText=`${forecast.daily[3].weather[0].main}`;
    weather5.innerText=`${forecast.daily[4].weather[0].main}`;
    weather6.innerText=`${forecast.daily[5].weather[0].main}`;
    weather7.innerText=`${forecast.daily[6].weather[0].main}`;
    weather8.innerText=`${forecast.daily[7].weather[0].main}`;
    imgdiv1.innerHTML=`<img class="weathericon" id="weathericon" src="http://openweathermap.org/img/wn/${forecast.daily[0].weather[0].icon}@2x.png" alt="WEATHER ICON">`
    imgdiv2.innerHTML=`<img class="weathericon" id="weathericon" src="http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@2x.png" alt="WEATHER ICON">`
    imgdiv3.innerHTML=`<img class="weathericon" id="weathericon" src="http://openweathermap.org/img/wn/${forecast.daily[2].weather[0].icon}@2x.png" alt="WEATHER ICON">`
    imgdiv4.innerHTML=`<img class="weathericon" id="weathericon" src="http://openweathermap.org/img/wn/${forecast.daily[3].weather[0].icon}@2x.png" alt="WEATHER ICON">`
    imgdiv5.innerHTML=`<img class="weathericon" id="weathericon" src="http://openweathermap.org/img/wn/${forecast.daily[4].weather[0].icon}@2x.png" alt="WEATHER ICON">`
    imgdiv6.innerHTML=`<img class="weathericon" id="weathericon" src="http://openweathermap.org/img/wn/${forecast.daily[5].weather[0].icon}@2x.png" alt="WEATHER ICON">`
    imgdiv7.innerHTML=`<img class="weathericon" id="weathericon" src="http://openweathermap.org/img/wn/${forecast.daily[6].weather[0].icon}@2x.png" alt="WEATHER ICON">`
    imgdiv8.innerHTML=`<img class="weathericon" id="weathericon" src="http://openweathermap.org/img/wn/${forecast.daily[7].weather[0].icon}@2x.png" alt="WEATHER ICON">`
}

