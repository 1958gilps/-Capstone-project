/* Global Variables */

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
*/
const key = '&key=fc643df8afa84232810d91605c97db23';
const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
//Event listener 
document.getElementById('submit').addEventListener('click', performAction); // jumps to performAction


function performAction (e) {
    const inputCity = document.getElementById('city').value; // reads the city entered
    const inputState = document.getElementById('state').value; // reads the state entered
    const inputDate = document.getElementById('date').value // reads the date entered
    console.log("city",inputCity);
    console.log("state", inputState);
    console.log("date", inputDate);
    getWeather(`${baseURL}${inputCity},${ inputState}${key}`) // jumps to getWeather

    .then(function(apiData) { //DATA as JSON
        console.log(apiData);
      postData('/saveData',(apiData)) // jumps to postData

    .then(
        updateUI()
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

//POST weather data to endpoint const weatherData = [];
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

//update UI
const updateUI = async () => {
    const request = await fetch ('/all') // request = Response {type: "basic", url: "http://localhost:3000/all/", redirected: true, status: 200, ok: true, …}
    try{
        const serverData = await request.json()
        console.log(serverData);

        for (var i=0; i<serverData.length; i++) {
            
            document.getElementById('date').innerHTML = serverData[i].date;
            document.getElementById('temp').innerHTML = serverData[i].temp+' °Fahrenheit';
            document.getElementById('zip').innerHTML = serverData[i].zip;
            document.getElementById('city').innerHTML = serverData[i].city;
            document.getElementById('input').innerHTML = serverData[i].input;

        }

    }catch (error){
        console.log('There is an error in the UI update...'+ error);
    };
};

export {performAction}