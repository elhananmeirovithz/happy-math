function taskPlus(id) {

    // buttons of task choice disappear: 
    document.getElementById("plus").style.display = "none";
    document.getElementById("minus").style.display = "none";
    document.getElementById("multiply").style.display = "none";
    document.getElementById("division").style.display = "none";

    // The XMLHttpRequest object is defined (AJAX): 
    var xhttp = new XMLHttpRequest();
    // the XMLHttpRequest object can be used to exchange data with a web server behind the scenes

    // when the request is ready, it reads and parse the JSON with the task
    xhttp.onreadystatechange = function () {  // is called everytime the readyStatus hanges
        //console.log(this.readyState)
        //console.log(this.status)
        if (this.readyState == 4 && this.status == 200) {  // when the response is ready, parse the JSON to object Obj
            console.log('the request is ready!')

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
            
            }  // closes if for reading the JSON
                                    
            // creating varibles from the JSON data: 
            var correctTaskAnswer = Obj.game_result; 
            var num_of_steps = Obj.steps.length; 
            // printing the results in the console:
            console.log("The correct task answer is " + correctTaskAnswer)
            console.log("The total steps num is " + num_of_steps)

            // reading steps and presenting them on the step-container 
            // a second after the presentation of the whole task: 
            setTimeout(step_appears, 1500)

            function step_appears() {
                var sign = Obj.steps[0].sign;
                var digit1 = Obj.steps[0].digit1;
                var digit2 = Obj.steps[0].digit2;
                var correctStepAnswer = Obj.steps[0].results;

                // presenting the step: 
                document.getElementById("step-container").style.display = "flex";

                document.getElementById("digit1").innerHTML = digit1;
                document.getElementById("digit2").innerHTML = digit2;
                document.getElementById("sign-step").innerHTML = sign;
            }


            // loop for reading the steps
            //for (var i = 0; i < num_of_steps; i++) {
                //console.log("this is step num " + (i+1))
                //console.log(Obj.steps[i])
                //var sign = Obj.steps[i].sign;
                //var digit1 = Obj.steps[i].digit1;
                //var digit2 = Obj.steps[i].digit2;
                //var results = Obj.steps[i].results;
            //}            


            setTimeout(new_game_button_appears, 3000)

            function new_game_button_appears() {
                document.getElementById("new-game").style.display = "block";
            
          // printing the results in the console:
            console.log("The correct answer is" + " " + correctTaskAnswer)  }  // reading JSON ends
        }
    };

    xhttp.open("GET", "./game-math1/targil/plus", true);  // specifies the request
    xhttp.send();  // sends the request to the server

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