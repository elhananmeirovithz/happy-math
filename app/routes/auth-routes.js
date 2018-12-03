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

/* for admin login */
router.post('/passport-local-admin',  function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (username == "admin@gmail.com" && password == "avigdor2") {
        passport.authenticate( 'local' ,{ 
                failureRedirect: '/admin',
                successRedirect: '/admin/game-admin'
            })(req,res,next);
    } else {
        res.redirect('/admin'); 
    }
    
    });


    // passport.authenticate( 'local' ,{ 
    //     failureRedirect: '/admin',
    //     successRedirect: '/game-admin'
    // }
    // ));

module.exports = router;