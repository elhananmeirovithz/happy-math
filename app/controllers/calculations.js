const math = require('mathjs');

module.exports = {
    /********** PLUS **********/ 
    plus: function () {
        var num = new(Array);
        num.push(math.randomInt(10, 1000));
        num.push(math.randomInt(0, num[0]));
        res_json = this.multiplus(num);
        return res_json
    },

    /********** MULTI - PLUS **********/ 
    multiplus: function (num) {
        //var num = [125,1515,1215,1568767];
        var steps_string = new(Array);
        var steps_results = new(Array);

        var num_string = new(Array);
        var num_string_length = new(Array);
        /* turn the numbers into strings */
        var steps_results_total = 0;
        num.forEach(function(value){
            var m = math.string(math.format(value, {notation: 'fixed'}));
            num_string_length.push(m.length);
            num_string.push(m);
            steps_results_total = steps_results_total + value;
        });
        num_string_length_max = math.max(num_string_length);

        /* start calculation*/
        var i = 0;
        var nExtra = 0;
        while (i < num_string_length_max) {
            // get the numbers for calculation //
            tmp = "";
            if (nExtra != 0){
                tmp = nExtra;
            }
            num_string.forEach(function(value){
                if (i < value.length) {
                    if (tmp != ""){
                        tmp = tmp + "+";
                    }
                    tmp = tmp + value.substr(-1*(i+1),1);
                } else {
                }
            });
            steps_string.push(tmp);
            steps_results.push(math.eval(tmp));
            nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
            i = i + 1;
        }
        var res_json = ({
            game_type: "plus",
            game_number: num,
            game_result: steps_results_total,
            steps_string: steps_string,
            steps_results: steps_results
        })
        return res_json

    },
    /********** MINUS **********/
    minus: function () {
        const num = new(Array);
        num.push(math.randomInt(10, 1000));
        num.push(math.randomInt(0, num[0]));
        //var num = [441,61];
        var steps_string = new(Array);
        var steps_results = new(Array);
        var steps_number0 = new(Array);//the first number changing over the calculation
        var nExtra = "";var n0 = "";var n1 = "";var tmp = "";
        num_string = math.string(num);
        var num_string_tmp_0=num_string[0];
        for (var i = 0; i < (num_string[0].length); i++){
            n0 = num_string_tmp_0.substr(-1*(i+1),1);
            //console.log(num_string[1].length + " " + i);
            if (i + 1 > num_string[1].length) {
                n1="";
                nExtra = "";
                tmp = n0;  
            } else {
                n1 = math.number(num_string[1].substr(-1*(i+1),1));
                if (n1 <= math.number(n0)) {
                    nExtra = "";
                    tmp = n0 + "-" + n1;   
                } else {
                    nExtra = math.number(n0) + 10;
                    tmp = nExtra + "-" + n1; 
                    num_string_tmp_0 = math.string( math.number(num_string_tmp_0) - Math.pow(10,(i+1)) );
                }
            }
            steps_string.push(tmp);
            steps_results.push(math.eval(tmp));
            steps_number0.push(num_string_tmp_0);
        }
        var res_json = ({
            game_type: "minus",
            game_number0: num[0],
            game_number1: num[1],
            game_result: num[0] - num[1],
            steps_string: steps_string,
            steps_number0: steps_number0,
            steps_results: steps_results
        })
        return res_json
    },
    /********** NULTIPLAY **********/
    multiply: function () {
        const num = new(Array);
        num.push(math.randomInt(10, 1000));
        num.push(math.randomInt(0, num[0]));
        var steps_string = new(Array);
        var steps_results = new(Array);
        var row_results = new(Array);
        var row_number = new(Array);
        var nExtra = "";var n0 = "";var n1 = "";var tmp = "";
        num_string = math.string(num);
        for (var i = 0; i < (num_string[1].length); i++){
            n1 = num_string[1].substr(-1*(i+1),1);
            row_results.push( (math.number(n1) * num[0]) * Math.pow(10,(i)) );
            nExtra = "";
            for (var ii = 0; ii < (num_string[0].length); ii++){
                n0 = num_string[0].substr(-1*(ii+1),1);
                if (nExtra == "") {
                    tmp = n1 + "*" + n0;
                    nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
                } else {
                    tmp =  n1 + "*" + n0 + "+" + nExtra;
                    nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
                }
                steps_string.push(tmp);
                steps_results.push(math.eval(tmp));
                row_number.push("row" + i);
            }
        }     
        plus_json = this.multiplus(row_results); 

        var res_json = ({
            game_type: "multiply",
            game_number0: num[0],
            game_number1: num[1],
            game_result: num[0] * num[1],
            row_results: row_results,
            row_number: row_number,
            steps_string: steps_string,
            steps_results: steps_results,
            plus_part: plus_json
        });
        return res_json
    },
    
    /********** DEVIATION **********/
    division : function () {
    }
};



