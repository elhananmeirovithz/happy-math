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
        
        if (this.readyState == 4 && this.status == 200) {  // when the response is ready, parse the JSON to object Obj
            Obj = JSON.parse(this.responseText);   // object with the task. It's a global var since there is no var declaration
            num_of_digits = Obj.game_result.toString().length;  // counts number of digits in the task results
            num_of_steps = Obj.steps.length;  // global variable
            correctTaskAnswer = Obj.game_result;  // global variable
            
            current_step_num = 1;
            decimal = 0;

            console.log(Obj)

            // the task appears 300 millisec after pressing the task name
            setTimeout(task_appears, 300)            
            setTimeout(step_appears, 500)
            setTimeout(new_game_button_appears, 2000)
            
        }  // closes if for reading the JSON
    };

    xhttp.open("GET", "./game-math1/targil/plus", true);  // specifies the request
    xhttp.send();  // sends the request to the server

}



// The task container appears and the numbers in the container appear as well according to JSON: 
function task_appears() {
    document.getElementById("task-container").style.display = "flex";  // task container appears
    document.getElementById("dynamic-title").innerHTML = "Let's Play";


    // presenting the numbers in the task-container: 
    document.getElementById("number1").innerHTML = Obj.game_number[0];
    document.getElementById("number2").innerHTML = Obj.game_number[1];

    //num_of_digits = Obj.game_result.toString().length;
    //console.log("number of digits in the results is " + num_of_digits)

    string_to_present = "?";

    // '???' presentation (instead of the answer): 
    for (var i = 0; i < num_of_digits; i++) {
        // string_to_present = string_to_present + "?";

        elementName = "results" + String(i + 1);
        // console.log(elementName)
        document.getElementById(elementName).style.display = "inline";
        document.getElementById(elementName).innerHTML = "?";
    }
}



function step_appears() {    
    if (Obj.game_type == "plus") {
        var sign = "+"; 
    }
    //var sign = Obj.steps[current_step_num - 1].sign;

    try {
        var digit1 = Obj.steps[current_step_num - 1].digit1;
    }
    catch(err) {
        console.log("bug1")
    }

    try {
        var digit2 = Obj.steps[current_step_num - 1].digit2;
        var correctStepAnswer = Obj.steps[current_step_num - 1].results;
    }
    catch (err) {
        console.log("bug2")
    }

    if (digit1 == undefined) {
        digit1 = 0;
    }

    if (digit2 == undefined) {
        digit2 = 0;
    }


    // presenting the step: 
    document.getElementById("step-container").style.display = "flex";

    document.getElementById("digit1").innerHTML = digit1;
    document.getElementById("digit2").innerHTML = digit2;
    document.getElementById("sign-step").innerHTML = sign;
    document.getElementById("user-answer").value = ""; // clear the value

    if (decimal == 1) {
        document.getElementById("decimal-step").style.display = "inline";
    } else {
        document.getElementById("decimal-step").style.display = "none";
    }

    // CHECK IF IT'S THE FINAL STEP
    if (current_step_num == num_of_digits) {
        console.log("--Finished--")
    }

    // IF IT IS, CHECK IF THE ANSWER IS CORRECT

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






// The button 'order a new game' appears: 
function new_game_button_appears() {
    document.getElementById("new-game").style.display = "block";
    
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