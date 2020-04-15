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

pp.get('/', function (req, res) {
  res.sendFile('dist/index.html') 
})

// designates what port the app will listen to for incoming requests
const port = 8080;

// Setup Server
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
  }
  
  app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
  });
  
  
  
    app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
  });
