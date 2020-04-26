/*
https://www.weatherbit.io/api
Sign up for the Weatherbit API!
With our Weather API you can retrieve current weather observations from over 45,000 live weather stations, 
historical weather data for the past 10 years from our archive of more than 120,000 stations, 
and highly localized weather forecasts for any point on the globe using the world's most trusted weather models! 
Weatherbit user account
usename : gilps1958
Password: capStone
Key: fc643df8afa84232810d91605c97db23
Name:  	Master API Key
Your API Key is still provisioning. Provisioning can take up to 30 minutes
Your Weatherbit API Key has been provisioned!
Your API Key is fc643df8afa84232810d91605c97db23
To upgrade your API key, or manage your account simply login to the account dashboard using your username: gilps1958
Thank your for using Weatherbit! Please contact us at support@weatherbit.io if you have any issues! 
We're here to help!
Plan: Free
500 calls/day
500 historical calls/day (trial)
1 month historical
16 day forecasts
48 hour forecasts (trial)
Air Quality / Energy API (trial)
Non-Commercial use only
95.0% Uptime
Data update delay: 1 hour
Price: Free 
*/
const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';  //16 day weather
const baseURL_past = 'https://api.weatherbit.io/v2.0/history/daily?city='; // historical weather
const key = '&key=fc643df8afa84232810d91605c97db23';
const tempInd = '&units=I'

export function apiWeather (e) {
    const inputCity = document.getElementById('city').value; // reads the city,state entered
    const departDate = document.getElementById('departDate').value; // reads the depart date entered
    const returnDate = document.getElementById('returnDate').value; // reads the return date entered
    console.log("city",inputCity);
    //console.log("departDate", departDate);
    //console.log("returnDate", returnDate);

    var now = new Date(); // Today - ex Sun Apr 26 2020 08:48:33 GMT-0400 (Eastern Daylight Time)
    var start = new Date(now.getFullYear(), 0, 0); // Last day of last year - ex Tue Dec 31 2019 00:00:00 GMT-0500 (Eastern Standard Time)
    var diff = now - start; // how many milliseconds this year to today
    var oneDay = 1000 * 60 * 60 * 24; // how many milliseconds in a day
    //var year = oneDay * 365; // how many milliseconds in a year
    var day = Math.floor(diff / oneDay); // Day of year: 117 (today)
    var d = new Date(departDate.split("-").join("/")) // change yyyy-mm-dd to yyyy/mm/dd
    var depart_diff = d - start; // milliseconds of the year for departing
    var depart_day = Math.floor(depart_diff / oneDay); // Depart Date: 144
    var r = new Date(returnDate.split("-").join("/")) // change yyyy-mm-dd to yyyy/mm/dd
    var return_diff = r - start; // milliseconds of the year for returning
    var return_day = Math.floor(return_diff / oneDay); // Depart Date: 145
    var departDate_past = new Date(d); 
    departDate_past.setFullYear(departDate_past.getFullYear() - 1)
    var past_forecast = departDate_past.toISOString().substring(0,10);
    var date = new Date(past_forecast);
    var newdate = new Date(date);
    newdate.setDate(newdate.getDate() +2);
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var yyyy = newdate.getFullYear();
    var past_forecast_plus1 = yyyy + '-' + mm + '-' + dd ;

    let duration = return_day - depart_day;

    console.log("duration",duration);

    const z = (13);

    if(depart_day < day+z) {
        getWeather_current(`${baseURL}${inputCity}${key}${tempInd}`) // jumps to getWeather_current

        .then(function(weatherData) { //DATA as JSON

            let startDayData;
    
            for (let dayData of weatherData.data) {
                //console.log(dayData.valid_date);
                //console.log(departDate);
                if (departDate==dayData.valid_date){
                    startDayData=dayData
                    break;
                }
            };
            const weatherSave = {
                city_name:weatherData.city_name,
                state_code:weatherData.state_code,
                weather:startDayData.weather.description,
                valid_date:startDayData.valid_date,
                high_temp:startDayData.high_temp,
                wind_spd:startDayData.wind_spd,
              }
              postData('/saveWeather',(weatherSave)) // jumps to postData

              .then(
                updateUI_dateCurrent()
                )
            });  
    }
    else {
            getWeather_future(`${baseURL_past}${inputCity}&start_date=${past_forecast}&end_date=${past_forecast_plus1}${key}${tempInd}`) // jumps to getWeather_past
            
            .then(function(weatherData) { //DATA as JSON
                console.log("Weatherbit line # 53", weatherData);
            
            const weatherSave = {
                city_name:weatherData.city_name,
                state_code:weatherData.state_code,
                datetime:weatherData.data[0].datetime,
                max_temp:weatherData.data[0].max_temp,
                min_temp:weatherData.data[0].min_temp,  
                max_wind_spd:weatherData.data[0].max_wind_spd,
                snow:weatherData.data[0].snow,
              }
    
          postData('/saveWeather',(weatherSave)) // jumps to postData
    
          .then(
            updateUI_dateFuture()
            )
        });
    }
};

//GET async
const getWeather_current = async (url) =>{

    //console.log(url);
 
    const response = await fetch (url);

    try {
        const weatherData = response.json();
        return weatherData;

    } catch (error) {
        console.log('There is an error in the GET update...'+ error);
    };
};

//GET async
const getWeather_future = async (url) =>{

    //console.log(url);
 
    const response = await fetch (url);

    try {
        const weatherData = response.json();
        return weatherData;

    } catch (error) {
        console.log('There is an error in the GET update...'+ error);
    };
};



///POST async
const postData = async function ( url='',data = {}) { 
    const res = await fetch (url, {  
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = res.json();

        //console.log("line 90", newData);
        return newData;
    }catch (error){
        console.log('There is an error in the POST update...'+ error);
    };
};

//update UI
const updateUI_dateCurrent = async () => {
    const request = await fetch ('/weather') // 
        try{
        const serverData = await request.json()
        //console.log("updateUI",serverData);
   
            document.getElementById('city_name').innerHTML = serverData[0].city_name;
            document.getElementById('state_code').innerHTML = serverData[0].state_code;
            document.getElementById('valid_date').innerHTML = serverData[0].valid_date;
            document.getElementById('weather').innerHTML = serverData[0].weather;
            document.getElementById('high_temp').innerHTML = serverData[0].high_temp;
            document.getElementById('wind_spd').innerHTML = serverData[0].wind_spd;
            document.getElementById('depart_date').innerHTML = departDate.value;
            document.getElementById('return_date').innerHTML = returnDate.value;
    }catch (error){
        console.log('There is an error in the UI update...'+ error);
    };
};
//update UI with Historical Data
const updateUI_dateFuture = async () => {
    const request = await fetch ('/weather') // 
        try{
        const serverData = await request.json()
        //console.log("updateUI_datePast",serverData);        
            document.getElementById('city_name').innerHTML = serverData[0].city_name;
            document.getElementById('state_code').innerHTML = serverData[0].state_code;
            document.getElementById('date').innerHTML = serverData[0].datetime;
            document.getElementById('hi_temp').innerHTML = serverData[0].max_temp;
            document.getElementById('lo_temp').innerHTML = serverData[0].min_temp;
            document.getElementById('max_wind_spd').innerHTML = serverData[0].max_wind_spd;
            document.getElementById('snow_fall').innerHTML = serverData[0].snow;
            document.getElementById('depart_date').innerHTML = departDate.value;
            document.getElementById('return_date').innerHTML = returnDate.value;
    }catch (error){
        console.log('There is an error in the UI update...'+ error);
    };
};

/*
<script>
var d = new Date();
document.getElementById("demo").innerHTML = d.toDateString();
</script>

</body>
</html>


*/
