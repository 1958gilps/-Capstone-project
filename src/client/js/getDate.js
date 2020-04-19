/*
Read the date entered on the web page
*/

export function apiDate (e) {
    const inputDate = document.getElementById('date').value // reads the date entered
    console.log("date", inputDate);
    postDate('/saveDate',(inputDate));
    }

//POSTdate to endpoint const apiDate = [];
const postDate = async ( url='',data ={}) => { 
    const response = await fetch (url, {
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });    
}
