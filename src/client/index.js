
//Event listener (s)
document.getElementById('submit').addEventListener('click', apiDate); //
document.getElementById('submit').addEventListener('click', apiLocation); //
document.getElementById('submit').addEventListener('click', apiWeather); //

import {apiDate} from './js/getDate'
import {apiLocation} from './js/getGeonames' // almost working. Pulls data
import {apiWeather} from './js/getWeatherbit'

import './styles/base.scss'
import './styles/box.scss'
import './styles/container.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'
