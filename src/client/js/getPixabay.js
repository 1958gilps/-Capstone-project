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

const key = '16105764-8b11a6d77c5013b870691f430';
const baseURL = 'https://pixabay.com/api/';

const example = 'baltimore,md&image_type=photo'

// no good - https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=Baltimore,MD&image_type=photo
// no good - https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=baltimore,md&image_type=photo
// is good - https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=Boston,MA&image_type=photo
// no good - https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=Chicago,IL&image_type=photo
// is good - https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=Dallas,TX&image_type=photo
// is good - https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=Miami,FL&image_type=photo
// is good - https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=Nashville,TN&image_type=photo
// no good - https://pixabay.com/api/?key=16105764-8b11a6d77c5013b870691f430&q=Pittsburg,PA&image_type=photo

export function apiPicture (e) {
    const inputCity = document.getElementById('city').value; // reads the city entered
    //console.log("city",inputCity);
    getPicture(`${baseURL}?key=${key}&q=${inputCity}&image_type=photo`) // jumps to getPicture

    //getPicture(`${baseURL}?key=${key}&q=${example}`) // jumps to getPicture

    .then(function(imageData) { //DATA as JSON
        console.log("pixabay line # 41", imageData);

        //const pictureSave = {
        //    pageURL:imageData.hits.pageURL,
        //    tags:imageData.hits.tags,
        //  }

        postData('/savePicture',(imageData)) // jumps to postData

        .then(
            //console.log("end apiPicture")
            updateUI()
            )
        });
    };


//GET async
const getPicture= async (url) =>{

    //console.log(url);
 
    const response = await fetch (url);

    try {
        const imageData = response.json();
        //console.log(imageData );
        return imageData ;

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

        //console.log(newData);
        return newData;
    }catch (error){
        console.log('There is an error in the POST update...'+ error);
    };
};

//update UI
const updateUI = async () => {
    const request = await fetch ('/picture') // 
        try{
        const serverData = await request.json()
        console.log("pixabay line # 102",serverData.id[0].tags);
            
            document.getElementById('image').innerHTML = serverData.id[0].tags;

    }catch (error){
        console.log('There is an error in the getPixabay UI update...'+ error);
    };
};