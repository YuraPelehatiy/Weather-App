let inputSearch = document.getElementById('inputSearch');
let btnGetData = document.getElementById('btnGetData');
let currentDate = new Date();

let date = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDay(),
    dayDate: currentDate.getDate(),
    hours: currentDate.getHours(),
    minutes: currentDate.getMinutes(),
    seconds: currentDate.getSeconds(),
}

inputSearch.addEventListener('change', getData16);

function getData(){
    if(!inputSearch.value){return}
    let name = inputSearch.value;
    let URL = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).
    then(res => res.json()).
    then(data => {
        console.log(data);
        let weather = data.weather[0]
        let iconUlr = "http://openweathermap.org/img/w/" + weather.icon + ".png";
        let output = `
                <div>
                    <h2>
                        ${weather.main} in ${data.name}
                        <img src=${iconUlr} alt=${weather.description}/>
                    </h2>
                    <div>
                        <p>Current: ${data.main.temp}</p>
                        <p>Hight: ${data.main.temp_max}</p>
                        <p>Low: ${data.main.temp_min}</p>
                        <p>Wind Speed: ${data.wind.speed}</p>
                    </div>
                </div>
        `;
        document.getElementById('outside').innerHTML = output;
    }).catch(dataError => {
            let output = `
                <h2>
                    City not found
                </h2>
            `;
            document.getElementById('outside').innerHTML = output;
        }
    ) ;
}

function getData16(){
    if(!inputSearch.value){return};
    let name = inputSearch.value;
    let URL =  "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + name + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).
    then(res => res.json()).
    then(data => {
        console.log(data);
        displayWeather(data)
    }).catch(dataError => {
        displayWeatherError()
    });   
}

document.getElementById('btnGetData').addEventListener('click', test)

function test(){
    console.log(`Year: ${date.year}, month: ${date.month}, day: ${date.dayDate}`);
}

function displayWeather(data){
    const nameOfDays = {
        '0': 'Sunday',
        '1': "Monday",
        '2': 'Tuesday',
        '3': 'Wednesday',
        '4': 'Thursday',
        '5': 'Friday',
        '6': 'Saturday',
        '7': 'Sunday',
        '8': "Monday",
        '9': 'Tuesday',
        '10': 'Wednesday',
        '11': 'Thursday',
        '12': 'Friday',
        '13': 'Saturday',
        '14': 'Sunday',
    }

    let outputNav = '';
    let outputContent = '';
    data.list.forEach((i, index) => {
        let weather = i.weather[0]
        let iconUlr = "http://openweathermap.org/img/w/" + weather.icon + ".png";

       outputNav += `
            <li class="nav-item">
                <a class="nav-link  ${index === 0 ? 'active' : ''}" id="day${index}-tab" data-toggle="tab" href="#day${index}" role="tab" aria-controls="day${index}" aria-selected="${index === 0 ? true : false}">
                    ${nameOfDays[date.day + index]} ${date.dayDate + index}
                </a>
            </li>
       `;
       outputContent += `
            <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="day${index}" role="tabpanel" aria-labelledby="day${index}-tab">
                <div>
                    <h2>
                        ${weather.main} in ${data.city.name}
                        <img src=${iconUlr} alt=${weather.description}/>
                    </h2>
                    <div>
                        <p>Night: ${i.temp.night}</p>
                        <p>Morning: ${i.temp.morn}</p>
                        <p>Day: ${i.temp.day}</p>
                        <p>Evening: ${i.temp.eve}</p>
                        <p>Min: ${i.temp.min}</p>
                        <p>Max: ${i.temp.max}</p>
                    </div>
                </div>
            </div>
       `;
       
       document.getElementById('myTab').innerHTML = outputNav;
       document.getElementById('myTabContent').innerHTML = outputContent;

    });
}

function displayWeatherError(){
    let output = `
        <h2>
            City not found
        </h2>
    `;
    document.getElementById('myTabContent').innerHTML = output;
    document.getElementById('myTab').innerHTML = '';
}