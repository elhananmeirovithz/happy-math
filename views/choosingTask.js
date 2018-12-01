//var Obj;

function evaluateInput() {
    
    // printing the object, task results and the total number of steps in the console:
    //console.log(Obj)
    //console.log('correct task results is ' + correctTaskAnswer)
    //console.log('number of steps is ' + num_of_steps)

    userInput = document.getElementById("user-answer").value;

    var digit1 = Number(document.getElementById("digit1").textContent);
    var digit2 = Number(document.getElementById("digit2").textContent);
    //console.log('current step equatation is ' + digit1 + "+" + digit2)
    //console.log("user input is " + userInput)

    //console.log(typeof digit1)

    var correctStepAnswer = digit1 + digit2 + decimal; 

    if (userInput == correctStepAnswer) {
        console.log("Correct!")
        document.getElementById("dynamic-title").innerHTML = "Correct!";

        var remainder = userInput%10;
        decimal = (userInput - remainder)/10; 
        console.log('decimal  ' + decimal)

        // presenting step's results on the task-container: 
        elementName = "results" + String(num_of_digits + 1 - current_step_num);
        console.log('number of steps = ' + num_of_steps)
        console.log('current step is ' + current_step_num)
        document.getElementById(elementName).innerHTML = remainder;

        if (decimal !== 0) {
            presentDecimal()
        }  else {
            eraseDecimal()
        }

        console.log('current step num is ' + current_step_num)

        // when the step's answer is correct, proceed to the next step: 
        current_step_num = current_step_num + 1; 

        setTimeout(step_appears, 1000, Obj, current_step_num)

    } else {
        console.log("Try again!")
        console.log(userInput)
        document.getElementById("user-answer").value = ""; // clear the value
        document.getElementById("dynamic-title").innerHTML = "Try again";
    } 
}


// The task container appears and the numbers in the container appear as well according to JSON: 
function task_appears(Obj) {
    document.getElementById("task-container").style.display = "flex";  // task container appears
    document.getElementById("dynamic-title").innerHTML = "Let's Play";


    // presenting the numbers in the task-container: 
    document.getElementById("number1").innerHTML = Obj.game_number[0];
    document.getElementById("number2").innerHTML = Obj.game_number[1];

    //num_of_digits = Obj.game_result.toString().length;
    //console.log("number of digits in the results is " + num_of_digits)

    string_to_present = "?"; 

    for (var i = 0; i < num_of_digits; i++) {
        // string_to_present = string_to_present + "?";

        elementName = "results" + String(i+1);
        // console.log(elementName)
        document.getElementById(elementName).style.display = "inline";
        document.getElementById(elementName).innerHTML = "?";
 
        // document.getElementById(elementName).innerHTML = "?";
    }
    

    //document.getElementById("results1").innerHTML = string_to_present; 
}




function step_appears(Obj, current_step_num) {
    var sign = Obj.steps[current_step_num-1].sign;

    if (Obj.steps[current_step_num - 1].digit1 == undefined)  {
        var digit1 = 0;
    } else {
        var digit1 = Obj.steps[current_step_num - 1].digit1;
    }

    if (Obj.steps[current_step_num - 1].digit2 == undefined) {
        var digit2 = 0;
    } else {
        var digit2 = Obj.steps[current_step_num - 1].digit2;
    }

    var correctStepAnswer = Obj.steps[current_step_num-1].results;

    // presenting the step: 
    document.getElementById("step-container").style.display = "flex";

    document.getElementById("digit1").innerHTML = digit1;
    document.getElementById("digit2").innerHTML = digit2;
    document.getElementById("sign-step").innerHTML = sign;
    document.getElementById("user-answer").value = ""; // clear the value

    // presenting the current step's "?" in red:
    elementName = "results" + String(num_of_digits + 1 - current_step_num);
    console.log('number of digits in answer = ' + num_of_digits)
    console.log('current step is ' + current_step_num)
    document.getElementById(elementName).style.color = "red"; 

    // presenting the previous correct answer in blue:
    previous_elementName = "results" + String(num_of_digits + 2 - current_step_num);
    console.log('previous step num is ' + previous_elementName)
    if (current_step_num !== 1) {
        document.getElementById(previous_elementName).style.color = "cornflowerblue"; 
    }

}


// The button 'order a new game' appears: 
function new_game_button_appears() {
    document.getElementById("new-game").style.display = "block";
    
}


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
    xhttp.onreadystatechange = function () {  // is called everytime the readyStatus changes
        //console.log(this.readyState)
        //console.log(this.status)

        if (this.readyState == 4 && this.status == 200) {  // when the response is ready, parse the JSON to object Obj
            Obj = JSON.parse(this.responseText);   // object with the task. It's a global var since there is no var declaration
            num_of_digits = Obj.game_result.toString().length;

            // the task appears 300 millisec after pressin the task name
            setTimeout(task_appears, 300, Obj)

            console.log(Obj)

            // creating varibles from the JSON data: 
            correctTaskAnswer = Obj.game_result;  // global variable
            num_of_steps = Obj.steps.length;  // global variable
            // printing the results in the console:

            // reading steps and presenting them on the step-container 
            // a second after the presentation of the whole task: 
            current_step_num = 1; 
            decimal = 0; 
            setTimeout(step_appears, 500, Obj, current_step_num)

            setTimeout(new_game_button_appears, 2000)
            // console.log('current step num is ' + current_step_num)

            // loop for reading the steps
            //for (var i = 0; i < num_of_steps; i++) {
            //console.log("this is step num " + (i+1))
            //console.log(Obj.steps[i])
            //var sign = Obj.steps[i].sign;
            //var digit1 = Obj.steps[i].digit1;
            //var digit2 = Obj.steps[i].digit2;
            //var results = Obj.steps[i].results;
            //}            


            
            
        }  // closes if for reading the JSON
    };

    xhttp.open("GET", "./game-math1/targil/plus", true);  // specifies the request
    xhttp.send();  // sends the request to the server

}



function presentDecimal() {
    document.getElementById("decimal_num").style.display = "inline";
}

function eraseDecimal() {
    document.getElementById("decimal_num").style.display = "none";
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

    document.getElementsByClassName("number").innerHTML = " ";
    //document.getElementById("results2").innerHTML = "";
    //document.getElementById("results3").innerHTML = "";
    //document.getElementById("results4").innerHTML = "";

    document.getElementById("task-container").style.display = "none";
    document.getElementById("step-container").style.display = "none";

    document.getElementById("dynamic-title").innerHTML = "Choose Your Task Type!";

    eraseDecimal()
}