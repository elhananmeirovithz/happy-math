const express = require('express');
const router = express.Router();
const passport = require('passport');

////////////
//log out //
////////////
router.get('/logout', (req, res) => {
    // handle with pasport
    req.logout();
    res.redirect('/')
    //res.send('logging out')
});

////////////////
//auth google //
////////////////
router.get('/google', passport.authenticate('google',{
    scope: ['email']
}));

// callback route for redirect to
router.get('/google/redirect', 
    passport.authenticate('google'),  
    (req,res) => {
        // res.send(req.user)
        res.redirect('/game-math1');
});

/////////////////
//auth facebook//
/////////////////
router.get('/facebook', passport.authenticate('facebook',{
    scope: ['email', 'user_birthday']
}));

// callback route for redirect to
router.get('/facebook/redirect', 
    passport.authenticate('facebook'),  
    (req,res) => {
        // res.send(req.user)
        res.redirect('/game-math1');
});


/////////////////
//auth passport-local//
/////////////////
router.post('/passport-local', 
    
    passport.authenticate( 'local' ,{ 
        failureRedirect: '/',
        successRedirect: '/game-math1'
    }));


// router.get('/passport-local', passport.authenticate('local',{
//     scope: ['email', 'user_birthday']
// }));

// // callback route for redirect to
// router.get('/passport-local/redirect', 
//     passport.authenticate('passport-local'),  
//     (req,res) => {
//         // res.send(req.user)
//         res.redirect('/game-math1');
// });

module.exports = router;