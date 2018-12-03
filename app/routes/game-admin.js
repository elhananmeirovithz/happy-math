const express = require('express');
const router = express.Router();


const authCheck = (req,res,next) => {
    if(!req.user){
        //if user is not logged in as an admin
        res.redirect('/admin')
    } else {
        next();
    }
};


/* for admin  */
router.get('/', (req, res) => {
    //function that will get the targil
    res.render('admin/game-admin-login')
    // res.send('you log into game-math1')
})

/* admin homepage */
router.get('/game-admin',authCheck, (req, res) => {
    res.render('admin/game-admin') // send the view with the same name after autentication
})

module.exports = router;