const express = require('express');
const router = express.Router();
const mathjs = require('mathjs'); 

router.get('/',(req, res) => {
    //show all aspects of matematics operations
    res.send({
        Adding: 'http://localhost:3000/api/math/' + 'adding',
        Subtraction: 'http://localhost:3000/api/math/' + 'subtraction',
        Multiply: 'http://localhost:3000/api/math/' + 'multiply'
    })
})

router.get('/:adding', (req, res, next) => { 
    const type = req.params.adding;
    number = new Array();
    number.push(mathjs.randomInt(10, 1000));
    number.push(mathjs.randomInt(0, number[0]));
    const total = number[0] + number[1];

    number0_str = mathjs.string(number[0]);
    number1_str = mathjs.string(number[1]);
    number0_parts = new Array();
    number1_parts = new Array();
    numbers_calculation = new Array();  
    numbers_calculation_results = new Array();  
    num_extra=0;
    for (var i = 0; i < number0_str.length; i++) {
        num0=mathjs.number(number0_str.slice(-1*(i+1)).slice(0,1));
        number0_parts.push(num0);
        console.log(i<=number1_str.length)
        if(i<=number1_str.length-1) {
            num1=mathjs.number(number1_str.slice(-1*(i+1)).slice(0,1));
            number1_parts.push(num1);
        } else {
            num1=0;
            number1_parts.push(null);
        }       
        if(num_extra == 0){
            numbers_calculation.push(mathjs.string(num0) + "+" + mathjs.string(num1));
            numbers_calculation_results.push(num0 + num1);
        }else{
            numbers_calculation.push(mathjs.string(num_extra) + "+" + mathjs.string(num0) + "+" + mathjs.string(num1));
            numbers_calculation_results.push(num0 + num1 + num_extra); 
        }
        num_extra=mathjs.floor((num0+num1)/10);
      }
    
    res.send(
        {
            type : type,
            number0 : number[0],
            number1 : number[1],
            steps : {
                number0_parts : number0_parts,
                number1_parts : number1_parts,
                numbers_calculation : numbers_calculation,
                numbers_calculation_results : numbers_calculation_results
            },
            total : total
            })
}); // handling a single product with the :


router.get('/:subtraction', (req, res, next) => {
    const type = req.params.adding;
    //console.log(type)
    res.send({
        type : type
    })
}); // handling a single product with the :

router.get('/:multiply', (req, res, next) => {
    const type = req.params.adding;
    //console.log(type)
    res.send({
        type : type
    })
}); // handling a single product with the :

module.exports = router;
