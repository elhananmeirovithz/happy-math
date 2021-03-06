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
    xhttp.onreadystatechange = function() {  // is called everytime the readyStatus changes
        
        if (this.readyState == 4 && this.status == 200) {  // when the response is ready, parse the JSON to object Obj
            Obj = JSON.parse(this.responseText);   // object with the task. It's a global var since there is no var declaration
            num_of_digits = Obj.game_result.toString().length;  // counts number of digits in the task results
            num_of_steps = Obj.steps.length;  // global variable

            // Checks the special case where the number of digits in the answer is greater than the number of steps
            if (num_of_digits != num_of_steps) {
                specialCase1 = true; 
            } else {
                specialCase1 = false; 
            }
            
            correctTaskAnswer = Obj.game_result;  // global variable            
            current_step_num = 1;
            decimal = 0;

            // Define the future string 'task_answer' that will represent the number the user composes 
            // from her correct steps' answers and presents it in the task-container: 
            task_answer = ''; 

            if (Obj.game_type == "plus") {
                sign = "+";
            } else if (Obj.game_type == "minus") {
                sign = "-";
            }

            console.log(Obj)
            console.log('Correct game results are ...' + correctTaskAnswer)

            // the task appears 300 millisec after pressing the task name
            task_appears()
            step_appears()
            setTimeout(new_game_button_appears, 1000)

            // keyboard appears 
            document.getElementById('keyboard-container').style.display = 'flex';
            
        }  // closes if for reading the JSON
    };

    xhttp.open("GET", "./game-math1/targil/plus", true);  // specifies the request
    xhttp.send();  // sends the request to the server

}

function taskMinus(id) {

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
            console.log(Obj)

            num_of_digits = Obj.game_result.toString().length;  // counts number of digits in the task results
            num_of_steps = Obj.steps.length;  // global variable

            // Checks the special case where the number of digits in the answer is greater than the number of steps
            if (num_of_digits != num_of_steps) {
                specialCase1 = true;
            } else {
                specialCase1 = false;
            }

            correctTaskAnswer = Obj.game_result;  // global variable            
            current_step_num = 1;
            decimal = 0;

            // Define the future string 'task_answer' that will represent the number the user composes 
            // from her correct steps' answers and presents it in the task-container: 
            task_answer = '';

            if (Obj.game_type == "plus") {
                sign = "+";
            } else if (Obj.game_type == "minus") {
                sign = "-";
            }

            console.log(Obj)
            console.log('Correct game results are ...' + correctTaskAnswer)

            // the task appears 300 millisec after pressing the task name
            setTimeout(task_appears, 300)
            setTimeout(step_appears, 500)
            setTimeout(new_game_button_appears, 1000)

        }  // closes if for reading the JSON
    };

    xhttp.open("GET", "./game-math1/targil/minus", true);  // specifies the request
    xhttp.send();  // sends the request to the server

}


// The task container appears and the numbers in the container appear as well according to JSON: 
function task_appears() {
    document.getElementById("task-container").style.display = "inline-grid";  // (or flex) - task container appears 
    var message = "Let's Play"; 
    document.getElementById("dynamic-title").innerHTML = message;

    // Cleaning the mess of previous tasks:
    document.getElementById("results1").style.display = "none";
    document.getElementById("results2").style.display = "none";
    document.getElementById("results3").style.display = "none";
    document.getElementById("results4").style.display = "none";

    document.getElementById("sign3").style.display = "none";

    document.getElementById("num11").innerHTML = "";
    document.getElementById("num12").innerHTML = "";
    document.getElementById("num13").innerHTML = "";
    // document.getElementById("sign1").innerHTML = "";
    document.getElementById("num21").innerHTML = "";
    document.getElementById("num22").innerHTML = "";
    document.getElementById("num23").innerHTML = "";

    // Calculating digits of the numbers: 
    var num13 = Obj.game_number[0] % 10;
    var num12 = (Obj.game_number[0] - num13) / 10 % 10 ; 
    var num11 = (Obj.game_number[0] - num13) / 100 ;

    num11 = Math.floor(num11); 
    
    console.log('num13 ' + num13)
    console.log('num12 ' + num12)
    console.log('num11 ' + num11) 

    var num23 = Obj.game_number[1] % 10;
    var num22 = (Obj.game_number[1] - num23) / 10 % 10;
    var num21 = (Obj.game_number[1] - num23) / 100;

    num21 = Math.floor(num21);

    console.log('num23 ' + num23)
    console.log('num22 ' + num22)
    console.log('num21 ' + num21) 

    // presenting the numbers in the task-container: 
    // The first number: 
    if (num11 != 0) {  // present the first digit only if it's not equal to 0, then present the second digit
        document.getElementById("num11").innerHTML = num11;
        document.getElementById("num12").innerHTML = num12;
    } else {
        if (num12 != 0) {  // if the first digit is equal to zero then check if the second digit is equal to zero, 
            // In this case present the second digit only if it's not 0
            document.getElementById("num12").innerHTML = num12;
        }
    } 
    // present the third digit in any case: 
    document.getElementById("num13").innerHTML = num13;

    // The second number: 
    if (num21 != 0) {  // present the first digit only if it's not equal to 0, then present the second digit
        document.getElementById("num21").innerHTML = num21;
        document.getElementById("num22").innerHTML = num22;
    } else {
        if (num22 != 0) {  // if the first digit is equal to zero then check if the second digit is equal to zero, 
            // In this case present the second digit only if it's not 0
            document.getElementById("num22").innerHTML = num22;
        }
    }
    // present the third digit in any case: 
    document.getElementById("num23").innerHTML = num23;
    
    // document.getElementById("num23").innerHTML = Obj.game_number[1];

    // var string_to_present = "?";

    

    var num1_digits = Obj.game_number[0].toString().length
    var num2_digits = Obj.game_number[1].toString().length

    console.log(num1_digits)
    console.log(num2_digits)

    // '???' presentation (instead of the answer): 
    for (var i = 1; i < num_of_digits + 1; i++) {
        // string_to_present = string_to_present + "?";

        var elementName = "results" + String(i);
        // console.log(elementName)
        document.getElementById(elementName).style.display = "inline";
        document.getElementById(elementName).innerHTML = "?";  
    }
}





function step_appears() {
    console.log('Starts step num ' + current_step_num)

    try {
        step_digit1 = Obj.steps[current_step_num - 1].digit1;
    }
    catch(err) {
        console.log("bug1")
    }

    try {
        step_digit2 = Obj.steps[current_step_num - 1].digit2;
        correctStepAnswer = Obj.steps[current_step_num - 1].results;
    }
    catch (err) {
        console.log("bug2")
    }

    if (step_digit1 == undefined) {
        step_digit1 = 0;
    }

    if (step_digit2 == undefined) {
        step_digit2 = 0;
    }


    // presenting digits of the step: 
    document.getElementById("step-container").style.display = "flex";

    document.getElementById("digit1").innerHTML = step_digit1;
    document.getElementById("digit2").innerHTML = step_digit2;
    document.getElementById("sign2").innerHTML = sign;
    document.getElementById("user-answer").value = ""; // clear the value

    if (decimal == 1) {
        document.getElementById("decimal-step").style.display = "inline";
        document.getElementById("sign3").style.display = "inline"; 
        document.getElementById("sign3").innerHTML = sign;
    } else {
        document.getElementById("decimal-step").style.display = "none";
        document.getElementById("sign3").style.display = "none"; 
    }

    
    // COLORS (temporarily disabled): 
    
    // presenting the current step's "?" in red:
    
    //elementName = "results" + String(num_of_digits + 1 - current_step_num);
    //console.log('number of digits in answer = ' + num_of_digits)
    //console.log('current step is ' + current_step_num)
    //document.getElementById(elementName).style.color = "red";

    // presenting the previous correct answer in blue:
    // previous_elementName = "results" + String(num_of_digits + 2 - current_step_num);
    //console.log('previous step num is ' + previous_elementName)
    //if (current_step_num !== 1) {
      //  document.getElementById(previous_elementName).style.color = "cornflowerblue";
    //}

}


function evaluateInput() {
    console.log('')
    console.log('Evaluates input on the step num ' + current_step_num)

    var userInput = document.getElementById("user-answer").value;

    // Evaluates user's input: 
    if (userInput == correctStepAnswer) {
        var message = 'Correct!'; 
        console.log(message)
        document.getElementById("dynamic-title").innerHTML = message;

        // if the step's answer is greater than 9, remember the decimal (1):
        var remainder = userInput%10;
        decimal = (userInput - remainder)/10; 

        // presenting step's results on the task-container: 
        var elementName = "results" + String(current_step_num);  // previous: (num_of_digits + 1 - current_step_num)

        console.log('element name ' + elementName)
        console.log('current_step_num ' + current_step_num)

        // Presenting the correct step's answer on the task-container: 
        document.getElementById(elementName).innerHTML = remainder;

        // Composing the user answer presented in the task container for the future use: 
        task_answer = String(remainder) + task_answer;
        console.log('composing the answer... ' + task_answer)


        // Checks if it's the final step: 
        if (current_step_num == Obj.steps.length) {  // makes sure that is the last step 
            console.log("--Last step--")
            //console.log(step_digit1)
            //console.log(step_digit2)
            //console.log(decimal)

            // SPECIAL CASE 1 - it's a final step and the answer of the step is higher than 9 
            // in other words, number of digit in the answer is diff from the number of steps:  
            if (specialCase1 == true) {
                console.log('last step of special case 1')

                console.log(num_of_digits)

                element_next = 'results' + num_of_digits
                console.log(element_next)

                document.getElementById('step-container').style.display = "none"; // clear step-container
                document.getElementById(element_next).innerHTML = '1';

                // updation task_answer
                task_answer = '1' + task_answer;

                if (task_answer == correctTaskAnswer) {
                    message = 'Congratulaitons! You finished the task!'; 
                    // keyboard disappears
                    document.getElementById('keyboard-container').style.display = 'none';

                    console.log(message)
                    document.getElementById("dynamic-title").innerHTML = message;

                    document.getElementById('step-container').style.display = "none"; // clear step-container
                    document.getElementById('decimal4').style.visibility = "hidden"; // clear decimal
                    document.getElementById('decimal3').style.visibility = "hidden"; // clear decimal


                    return;  // stoping the function
                } else {
                    console.log('error - the answer is incorrect')
                }
            }

        }


        if (decimal !== 0) {
            presentDecimal()
        }  else {
            eraseDecimal()
        }
        
        // IF THE TASK IS FINISHED, MAKES SURE THE ANSWER IS CORRECT
        if (task_answer.length == num_of_digits) {
            console.log('You finished the task!!!')

            if (task_answer == correctTaskAnswer) {
                message = 'Congratulaitons! You finished the task!';

                // keyboard disappears
                document.getElementById('keyboard-container').style.display = 'none';
                
                console.log(message)
                document.getElementById("dynamic-title").innerHTML = message;

                document.getElementById('step-container').style.display = "none"; // clear step-container

                return;  // stoping the function
            }

        }

        // When the step's answer is correct, but it's not the final step, proceed to the next step: 
        current_step_num = current_step_num + 1; 
        setTimeout(step_appears, 1000)

    // If the step's answer is incorrect: 
    } else {  
        console.log("Try again!")
        //console.log(userInput)
        document.getElementById("user-answer").value = ""; // clear the value
        document.getElementById("dynamic-title").innerHTML = "Try again";
    } 
}






// The button 'order a new game' appears: 
function new_game_button_appears() {
    document.getElementById("new-game").style.display = "block";
    
}




function presentDecimal() {
    var element_next = "decimal" + (current_step_num + 1); 
    var element_current = "decimal" + current_step_num; 
    console.log(current_step_num)
    console.log(element_next)

    document.getElementById(element_next).style.visibility = "visible";
    document.getElementById(element_current).style.visibility = "hidden";
}

function eraseDecimal() {
    var element_current = "decimal" + current_step_num; 
    console.log(current_step_num)
    console.log(element_current)
    document.getElementById(element_current).style.visibility = "hidden";
    //document.getElementById("decimal1").innerHTML = " ";
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