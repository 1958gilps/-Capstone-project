
const dotenv = require('dotenv');
dotenv.config();

let path = require('path')
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

let apiPicture = [];
let weatherData = [];
let locationData = [];

 //GET data from apiDate = [];
 app.get('/picture', function(request, response) {
  response.send(apiPicture)
});

 //GET data from weatherData = [];
app.get('/weather', function(request, response) {
  response.send(weatherData)
});

 //GET location from locationData = [];
 app.get('/location', function(request, response) {
  response.send(locationData)
});

//POST date for the api
app.post('/savePicture', function (request, response) {
  console.log(request.body)
  apiPicture.push(request.body)
  })

//POST data to weatherData = [];
app.post('/saveWeather', function (request, response) {
  console.log(request.body)
    weatherData.push(request.body)
  })

//POST location to locationData = [];
app.post('/saveLocation', function (request, response) {
  console.log("geonames_apiLocation :", request.body)
    locationData.push(request.body)
  })

// Test if server is working
app.get('/test', function (request, response) {
    response.send(mockAPIResponse);
  });
  
 