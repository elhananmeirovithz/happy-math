// console.log('Hello!')

// console.log(window.screen)  // The window.screen object contains information about the user's screen

function taskPlus(id) {

    // buttons of task choice disappear: 
    document.getElementById("plus").style.display = "none";
    document.getElementById("minus").style.display = "none";
    document.getElementById("multiply").style.display = "none";
    document.getElementById("division").style.display = "none";

    // The XMLHttpRequest object is defined" 
    var xhttp = new XMLHttpRequest();
    // the XMLHttpRequest object can be used to exchange data with a web server behind the scenes

    // when the request is ready, it reads and parse the JSON with the task
    xhttp.onreadystatechange = function () {  // is called everytime the readyStatus hanges
        console.log(this.readyState)
        console.log(this.status)
        if (this.readyState == 4 && this.status == 200) {  // when the response is ready, parse the JSON to object Obj
            console.log('request is ready!')

            // object with the task: 
            var Obj = JSON.parse(this.responseText);

            // printing the object in the console: 
            console.log(Obj)

            setTimeout(task_appears, 300)

            function task_appears() {
                document.getElementById("task-container").style.display = "flex";

                // presenting the numbers in the task-container: 
                document.getElementById("number1").innerHTML = Obj.game_number[0];
                document.getElementById("number2").innerHTML = Obj.game_number[1];
            }
                                    
            // creating varibles from the JSON data: 
            var correctAnswer = Obj.game_result; 
            
            // reading steps and presenting them on the step-container 
            // a second after the presentation of the whole task: 
            setTimeout(step_appears, 1500)

            function step_appears() {
                var step_number = 1;
                var digit1 = 3;
                var digit2 = 5;
                var sign = "+"; 
                var correctStepAnswer = 8; 

                // presenting the step: 
                document.getElementById("step-container").style.display = "flex";

                document.getElementById("digit1").innerHTML = digit1;
                document.getElementById("digit2").innerHTML = digit2;
                document.getElementById("sign-step").innerHTML = sign;
            }
             
            // printing the results in the console:
            console.log("The correct answer is" +  " " + correctAnswer)


            setTimeout(new_game_button_appears, 3000)

            function new_game_button_appears() {
                document.getElementById("new-game").style.display = "block";
            }
        }
    };
    xhttp.open("GET", "./game-math1/targil/plus", true);  // specifies the request
    xhttp.send();  // sends the request to the server

    
    // document.getElementById("new-game").style.


    // change the color after the 1.5 sec: 
    //setTimeout(step_appears, 1500)

   // function step_appears() {
        // the task and the first steps appear when a user chooses a game type
        //document.getElementById("task-container").style.display = "flex";
        //document.getElementById("step-container").style.display = "flex";

        //document.getElementById("digit1").style.color = "#FF00FF";
        //document.getElementById("digit2").style.color = "#FF00FF";
        //document.getElementById("sign-step").style.color = "#FF00FF";
        //document.getElementById("sign-equal").style.color = "#FF00FF";
    //}

    // new-game button appears

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

    document.getElementById("task-container").style.display = "none";
    document.getElementById("step-container").style.display = "none";
}