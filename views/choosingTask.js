// console.log('Hello!')

// console.log(window.screen)  // The window.screen object contains information about the user's screen

function loadTaskPlus(id) {

    var xhttp = new XMLHttpRequest();
    // The XMLHttpRequest object can be used to exchange data with a web server behind the scenes

    // console.log(xhttp)
    xhttp.onreadystatechange = function () {  // is called everytime the readyStatus hanges
        console.log(this.readyState)
        console.log(this.status)
        if (this.readyState == 4 && this.status == 200) {  // when the response is ready, parse the JSON to object Obj
            console.log('Yes!')

            var Obj = JSON.parse(this.responseText);
            console.log(Obj)
            //document.getElementById('dynamic-title').innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "./game-math1/targil/plus", true);  // specifies the request
    xhttp.send();  // sends the request to the server

    document.getElementById("plus").style.display = "none";
    document.getElementById("minus").style.display = "none";
    document.getElementById("multiply").style.display = "none";
    document.getElementById("division").style.display = "none";
    document.getElementById("new-game").style.display = "block";
}



function loadTaskMinus(id) {

    var xhttp = new XMLHttpRequest();
    // The XMLHttpRequest object can be used to exchange data with a web server behind the scenes

    // console.log(xhttp)
    xhttp.onreadystatechange = function () {  // is called everytime the readyStatus hanges
        console.log(this.readyState)
        console.log(this.status)
        if (this.readyState == 4 && this.status == 200) {  // when the response is ready, parse the JSON to object Obj
            console.log('Yes!')

            var Obj = JSON.parse(this.responseText);
            console.log(Obj)
            //document.getElementById('dynamic-title').innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "./game-math1/targil/minus", true);  // specifies the request
    xhttp.send();  // sends the request to the server

    document.getElementById("plus").style.display = "none";
    document.getElementById("minus").style.display = "none";
    document.getElementById("multiply").style.display = "none";
    document.getElementById("division").style.display = "none";
    document.getElementById("new-game").style.display = "block";
}



function loadTaskMulty(id) {

    var xhttp = new XMLHttpRequest();
    // The XMLHttpRequest object can be used to exchange data with a web server behind the scenes

    // console.log(xhttp)
    xhttp.onreadystatechange = function () {  // is called everytime the readyStatus hanges
        console.log(this.readyState)
        console.log(this.status)
        if (this.readyState == 4 && this.status == 200) {  // when the response is ready, parse the JSON to object Obj
            console.log('Yes!')

            var Obj = JSON.parse(this.responseText);
            console.log(Obj)
            //document.getElementById('dynamic-title').innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "./game-math1/targil/multiply", true);  // specifies the request
    xhttp.send();  // sends the request to the server

    document.getElementById("plus").style.display = "none";
    document.getElementById("minus").style.display = "none";
    document.getElementById("multiply").style.display = "none";
    document.getElementById("division").style.display = "none";
    document.getElementById("new-game").style.display = "block";
}



function loadTaskDiv(id) {

    var xhttp = new XMLHttpRequest();
    // The XMLHttpRequest object can be used to exchange data with a web server behind the scenes

    // console.log(xhttp)
    xhttp.onreadystatechange = function () {  // is called everytime the readyStatus hanges
        console.log(this.readyState)
        console.log(this.status)
        if (this.readyState == 4 && this.status == 200) {  // when the response is ready, parse the JSON to object Obj
            console.log('Yes!')

            var Obj = JSON.parse(this.responseText);
            console.log(Obj)
            //document.getElementById('dynamic-title').innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "./game-math1/targil/division", true);  // specifies the request
    xhttp.send();  // sends the request to the server

    document.getElementById("plus").style.display = "none";
    document.getElementById("minus").style.display = "none";
    document.getElementById("multiply").style.display = "none";
    document.getElementById("division").style.display = "none";
    document.getElementById("new-game").style.display = "block";
}


function orderNewGame(id) {
    document.getElementById("plus").style.display = "block";
    document.getElementById("minus").style.display = "block";
    document.getElementById("multiply").style.display = "block";
    document.getElementById("division").style.display = "block";
    document.getElementById("new-game").style.display = "none";
}