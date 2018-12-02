const express = require('express');
const router = express.Router();


/* for test  */
router.get('/', (req, res) => {
    //function that will get the targil
    res.render('game-math-elh',{user:req.user})
    // res.send('you log into game-math1')
})


module.exports = router;