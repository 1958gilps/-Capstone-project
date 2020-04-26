/*
Pixabay API

Welcome to the Pixabay API documentation. 
Our API is a RESTful interface for searching and retrieving free images and videos released under the Pixabay License.

https://pixabay.com/api/docs/

Pixabay user account
usename : gilps1958
Password: CapStone

API Key = 16105764-8b11a6d77c5013b870691f430

example - https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=yellow+flowers&image_type=photo
*/
// "https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=Baltimore, MD&image_type=photo&pretty=true"

const baseURL = 'https://pixabay.com/api/';
const key = '16105764-8b11a6d77c5013b870691f430';

export function apiPicture (e) {
    const inputCity = document.getElementById('city').value; // reads the city entered

    getPicture(`${baseURL}?key=${key}&q=${inputCity}&image_type=photo`) // jumps to getPicture

    .then(function(imageData) { //DATA as JSON

        document.getElementById('image').src = imageData.hits[0].webformatURL;
    })
};

//GET async
const getPicture= async (url) =>{

    const response = await fetch (url);

    try {
        const imageData = response.json();

        return imageData ;
        } 
        catch (error) {
            console.log('There is an error in the GET update...'+ error);
        };
};