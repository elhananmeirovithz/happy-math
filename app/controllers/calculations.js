const math = require('mathjs');

module.exports = {
    /********** PLUS **********/ 
    plus: function () {
        var num = new(Array);
        num.push(math.randomInt(10, 1000));
        num.push(math.randomInt(0, num[0]));
        var steps_string = new(Array);
        var steps_results = new(Array);
        var nExtra = "";var n0 = "";var n1 = "";var tmp = "";
        num_string = math.string(num);
        for (var i = 0; i < (num_string[0].length); i++){
            n0 = num_string[0].substr(-1*(i+1),1);
            if (i < num_string[1].length & nExtra != "") {
                n1 = num_string[1].substr(-1*(i+1),1);
                tmp = nExtra + "+" + n0 + "+" + n1;
                nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
            } else if (i < num_string[1].length) {
                n1 = num_string[1].substr(-1*(i+1),1);
                tmp = n0 + "+" + n1;
                nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
            } else if (i >= num_string[1].length  & nExtra != "") {
                n1="";
                tmp = nExtra + "+" + n0;
                nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
            } else {
                n1="";
                tmp = n0;
                nExtra = "";
            }
            steps_string.push(tmp);
            steps_results.push(math.eval(tmp));
        }
        var res_json = ({
            game_type: "plus",
            game_number0: num[0],
            game_number1: num[1],
            game_result: num[0] + num[1],
            steps_string: steps_string,
            steps_results: steps_results
        })
        return res_json
    },

    /********** MULTI - PLUS **********/ 
    multiplus: function () {
        var num = new(Array);
        num.push(math.randomInt(10, 1000));
        num.push(math.randomInt(0, num[0]));
        var steps_string = new(Array);
        var steps_results = new(Array);
        var nExtra = "";var n0 = "";var n1 = "";var tmp = "";
        num_string = math.string(num);
        for (var i = 0; i < (num_string[0].length); i++){
            n0 = num_string[0].substr(-1*(i+1),1);
            if (i < num_string[1].length & nExtra != "") {
                n1 = num_string[1].substr(-1*(i+1),1);
                tmp = nExtra + "+" + n0 + "+" + n1;
                nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
            } else if (i < num_string[1].length) {
                n1 = num_string[1].substr(-1*(i+1),1);
                tmp = n0 + "+" + n1;
                nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
            } else if (i >= num_string[1].length  & nExtra != "") {
                n1="";
                tmp = nExtra + "+" + n0;
                nExtra = math.floor(math.eval(tmp)/10); // to make the extra number
            } else {
                n1="";
                tmp = n0;
                nExtra = "";
            }
            steps_string.push(tmp);
            steps_results.push(math.eval(tmp));
        }
        var res_json = ({
            game_type: "plus",
            game_number0: num[0],
            game_number1: num[1],
            game_result: num[0] + num[1],
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
    multiplay: function () {
    },
    
    /********** DEVIATION **********/
    division : function () {
    }
};



