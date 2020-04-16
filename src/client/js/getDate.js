/*
Read the date entered on the web page
*/
function readDate(event) {
    event.preventDefault();

    // check what date was put into the form field
    let enterDate = document.getElementById('date').value
    console.log(enterDate);

    //let enterlenDate = enterDate.length;
    //console.log(enterLength);

    //Client.checkForDate(enterDate);
}
export { readDate };
