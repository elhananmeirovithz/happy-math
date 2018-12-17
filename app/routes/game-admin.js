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

/* for Levels  */
router.get('/game-admin-levels',authCheck, (req, res) => {
    res.render('admin/game-admin-levels')
})

/* for Levels  */
router.get('/game-admin-levels-add',authCheck, (req, res) => {
    res.render('admin/game-admin-levels-add')
})

/* for tests  */
router.get('/game-admin-test',authCheck, (req, res) => {
    res.render('admin/game-admin-test')
})


module.exports = router;