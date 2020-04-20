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

const key = '&key=fc643df8afa84232810d91605c97db23';
const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';

export function apiWeather (e) {
    const inputCity = document.getElementById('city').value; // reads the city entered
    const inputState = document.getElementById('state').value; // reads the state entered
    console.log("city",inputCity);
    console.log("state", inputState);
    getWeather(`${baseURL}${inputCity},${ inputState}${key}`) // jumps to getWeather

    .then(function(apiData) { //DATA as JSON
        console.log(apiData);
      postData('/saveWeather',(apiData)) // jumps to postData

      .then(
        console.log("end apiWeather")
        )
    });
};

//GET async
const getWeather = async (url) =>{

    console.log(url);
 
    const response = await fetch (url);

    try {
        const apiData = response.json();
        console.log(apiData);
        return apiData;

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

        console.log(newData);
        return newData;
    }catch (error){
        console.log('There is an error in the POST update...'+ error);
    };
};
