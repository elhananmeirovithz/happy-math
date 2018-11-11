const express = require('express');
const router = express.Router();

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

module.exports = router;