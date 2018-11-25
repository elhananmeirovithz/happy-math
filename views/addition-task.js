console.log('Hello!')

console.log(window.screen)  // The window.screen object contains information about the user's screen

function loadTaskPlus(id) {

    var xhttp = new XMLHttpRequest();
    console.log(xhttp)
    xhttp.onreadystatechange = function () {
        console.log(this.readyState)
        console.log(this.status)
        if (this.readyState == 4 && this.status == 200) {
            console.log('Yes!')

            var Obj = JSON.parse(this.responseText);
            console.log(Obj)
            //document.getElementById('dynamic-title').innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "./game-math1/targil/plus", true);
    xhttp.send();
}