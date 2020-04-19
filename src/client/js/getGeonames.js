 /*
Create an account with Geonames.
Replace the openweather api with geonames api. You already have one working api. 
What information needs to get adjusted so that instead of entering a zip code, 
you enter a city? We want to get the latitude, longitude, country, instead of getting the temperature, feeling, and date.

    The weather data array was named differently, what do we need to change the name to?
    The weather data only had 1 object in the array, the geoname api outputs multiple objects. 
    How do we call the first object?
*/
/*
https://www.geonames.org/

The GeoNames geographical database covers all countries and contains over eleven million placenames 
that are available for download free of charge

geonames.org.
GeoNames user account
usename : gilps1958
Password: CapStone

Hello gilps1958

Welcome to GeoNames. We have created an account for you with the username 'gilps1958'.
Please use the following link to activate your account :

http://www.geonames.org/activate/35Yjaxhr/gilps1958/

In case of questions or problems don't hesitate to get in touch with us at info@geonames.org.

Here some links you could find useful:
GeoNames User Manual : http://www.geonames.org/manual.html
GeoNames Blog : http://geonames.wordpress.com
GeoNames Forum : http://forum.geonames.org
GeoNames Mailinglist : http://groups.google.com/group/geonames

Your GeoNames team
*/

// example string - 'http://api.geonames.org/geoCodeAddressJSON?q=Museumplein+6+amsterdam&username=demo'

const example = 'http://api.geonames.org/addressJSON?lat=52.358&lng=4.881&username=gilps1958'

//const userName = '&username=gilps1958'
//const baseURL = 'http://api.geonames.org/geoCodeAddressJSON?q=Museumplein+6+'

export function apiLocation (e) {
    const inputCity = document.getElementById('city').value; // reads the city entered
    const inputState = document.getElementById('state').value; // reads the state entered
    //const inputDate = document.getElementById('date').value // reads the date entered
    console.log("city",inputCity);
    console.log("state",inputState);
    //console.log("date", inputDate);
    getLocation(`${example}`) //

    .then(function(apiData) { //DATA as JSON
        console.log(apiData);
      postData('/saveLocation',(apiData)) // jumps to postData

      .then(
        console.log("end")
        )
    });
};

//GET async
const getLocation = async (url) =>{

    console.log(url);
 
    const res = await fetch (url);

    try {
        const apiData = res.json();
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
};