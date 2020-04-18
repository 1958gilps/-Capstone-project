
const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const mockAPIResponse = require('./mockAPI.js');

// Set up express
const express = require('express');
// Start an instance of app
const app = express();

// Middleware
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//start directory
app.use(express.static('dist'));

app.get('/', function (request, response) {
  response.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
const port = 8080;

// Setup Server
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
  };

 let weatherData = [];

 app.get('/', function (request, response) {
  response.sendFile('dist/index.html') 
});

 //GET data from weatherData = [];
app.get('/all', function(request, response) {
  response.send(weatherData)
});

//POST data to weatherData = [];
app.post('/saveData', function (request, response) {
  console.log(request.body)
    weatherData.push(request.body)
  })

// Test if server is working
app.get('/test', function (request, response) {
    response.send(mockAPIResponse);
  });
  
  /*

https://www.geonames.org/

The GeoNames geographical database covers all countries and contains over eleven million placenames 
that are available for download free of charge

geonames.org.
GeoNames user account
usename : gilps1958
Password: capStone

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
/*
Pixabay API

Welcome to the Pixabay API documentation. 
Our API is a RESTful interface for searching and retrieving free images and videos released under the Pixabay License.

https://pixabay.com/api/docs/

Pixabay user account
usename : gilps1958
Password: capStone
*/