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
        const num = new(Array);
        num.push(math.randomInt(10, 1000));
        num.push(math.randomInt(0, num[0]));
        res.send({
            type: "minus",
            num0: num[0],
            num1: num[1]
        })




    } else {
        //console.log(req.params.cal_type);
        res.send({
            a: 1,
            b: 3
        })
    }
});




module.exports = router;