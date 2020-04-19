/*
Create an account with Weatherbit.
Integrate the Weatherbit API similarly to how you integrated the geoname api. 
What information needs to get adjusted for you to pull in the future weather? Getting a CORS error? 
Check out this article for some options. 
NOTE: If you see that your app is working, but it takes several clicks to get all of the data, 
think of why this could be. This is possibly the most challenging part of the project. 
There is a major hint located in the Before you Begin section. If you’re unable to figure it out, 
and your app still works with a few clicks, continue working on it, it may come to you later, 
or you’ll get guidance from your reviewer when you submit the app.

    How does the Weatherbit API distinguish from the current forecast and future forecasts? 
    Does the API change in any way?
    How will we include the date? What format does it need to be in? How can we change it to the appropriate format?
 */
/*
https://www.weatherbit.io/api

Sign up for the Weatherbit API!

With our Weather API you can retrieve current weather observations from over 45,000 live weather stations, 
historical weather data for the past 10 years from our archive of more than 120,000 stations, 
and highly localized weather forecasts for any point on the globe using the world's most trusted weather models! 

Weatherbit user account
usename : gilps1958
Password: CapStone

Key: fc643df8afa84232810d91605c97db23
Name:  	Master API Key
*/

const key = '&key=fc643df8afa84232810d91605c97db23';
const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';

export function apiWeather (e) {
    const inputCity = document.getElementById('city').value; // reads the city entered
    const inputState = document.getElementById('state').value; // reads the state entered
    //const inputDate = document.getElementById('date').value // reads the date entered
    console.log("city",inputCity);
    console.log("state", inputState);
    //console.log("date", inputDate);
    getWeather(`${baseURL}${inputCity},${ inputState}${key}`) // jumps to getWeather

    .then(function(apiData) { //DATA as JSON
        console.log(apiData);
      postData('../saveData',(apiData)) // jumps to postData

      .then(
        console.log("end")
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

//POST async
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
}