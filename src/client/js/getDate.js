/*
Read the date entered on the web page
*/

export function apiDate (e) {
    const inputDate = document.getElementById('date').value // reads the date entered
    console.log('date = ',inputDate);
    postData('./saveDate',(inputDate)) // jumps to postData
    .then(
        console.log("end")
        )
    };
    
//POSTdate to endpoint const apiDate = [];
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