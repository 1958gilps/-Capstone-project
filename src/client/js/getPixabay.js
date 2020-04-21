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

const key = '16105764-8b11a6d77c5013b870691f430';
const baseURL = 'https://pixabay.com/api/?key=';

export function apiPicture (e) {
    const inputCity = document.getElementById('city').value; // reads the city entered
    const inputState = document.getElementById('state').value; // reads the state entered
    console.log("city",inputCity);
    console.log("state", inputState);
    getPicture(`${baseURL}${key}&q=${inputCity}&image_type=photo`) // jumps to getPicture

    .then(function(apiData) { //DATA as JSON
        console.log(apiData);
      postData('/savePicture',(apiData)) // jumps to postData

      .then(
        console.log("end apiPicture")
        )
    });
};

//GET async
const getPicture= async (url) =>{

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