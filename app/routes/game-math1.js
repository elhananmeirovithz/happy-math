const express = require('express');
const router = express.Router();
const math = require('mathjs');

const calculationsControllers = require('../controllers/calculations.js');

const authCheck = (req,res,next) => {
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login')
    } else {
        next();
    }
};

router.get('/',authCheck, (req, res) => {
    //function that will get the targil
    res.render('game-math1',{user:req.user})
    // res.send('you log into game-math1')
})


router.get('/targil/:cal_type', authCheck, (req, res, next) => {
    if (req.params.cal_type=="plus") {
         res.send(calculationsControllers.plus())

    } else if (req.params.cal_type=="minus") {
        res.send(calculationsControllers.minus())

    } else if (req.params.cal_type=="multiply") {
        res.send(calculationsControllers.multiply())

    } else if (req.params.cal_type=="division") {
        const num = new(Array);
        num.push(math.randomInt(10, 1000));
        num.push(math.randomInt(1, 9));
        var num_string = new(Array);
        num.forEach(function(value){
            var m = math.string(math.format(value, {notation: 'fixed'}));
            num_string.push(m);
        });
        tmp = "";
        var steps_string = new(Array);
        var steps_results = new(Array);
        for (var i = 0; i < (num_string[0].length); i++){
            n0 = num_string[0].substr(i,1);
            tmp = n0 + "/" + num_string[1];
            steps_string.push(tmp);
            steps_results.push(math.eval(tmp));
            console.log(n0)
        }   


        // var steps_string = new(Array);
        // var steps_results = new(Array);
        // var row_results = new(Array);
        // var row_number = new(Array);
        // var nExtra = "";var n0 = "";var n1 = "";var tmp = "";
        // num_string = math.string(num);
        // for (var i = 0; i < (num_string[1].length); i++){
        //     n1 = num_string[1].substr(-1*(i+1),1);
        //     row_results.push( (math.number(n1) * num[0]) * Math.pow(10,(i)) );
        //     nExtra = "";
        //     for (var ii = 0; ii < (num_string[0].length); ii++){
        //         n0 = num_string[0].substr(-1*(ii+1),1);
        //         if (nExtra == "") {
        //             tmp = n1 + "*" + n0;
        //             nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
        //         } else {
        //             tmp =  n1 + "*" + n0 + "+" + nExtra;
        //             nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
        //         }
        //         steps_string.push(tmp);
        //         steps_results.push(math.eval(tmp));
        //         row_number.push("row" + i);
        //     }
        // }     
        // plus_json = calculationsControllers.multiplus(row_results);   // need to work more!!!!

        var res_json = ({
            game_type: "Long_division",
            game_number0: num[0],
            game_number1: num[1],
            game_result: math.floor(num[0] / num[1]),
            game_result_residual: num[0] - (math.floor(num[0] / num[1]) * num[1]),
            steps_string: steps_string,
            steps_results: steps_results,
        });
        res.send(res_json)

    } else {
        //console.log(req.params.cal_type);
        res.send({
            a: 1,
            b: 3
        })
    }
});


module.exports = router;