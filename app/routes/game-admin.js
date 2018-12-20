const express = require('express');
const router = express.Router();
const User = require('../../api/models/user');
const Targil = require('../../api/models/targil');

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

/* users list  */
router.get('/game-admin-users-list',authCheck, (req, res) => {
    res.render('admin/game-admin-users-list')
})

/* users activity list  */
router.get('/game-admin-users-list-activity-disp/:userId',authCheck, (req, res) => {
    const id=req.params.userId;
    User.findOne({ "_id": id })
	.select(['username','email','password','googleInfo','role'])
	.exec()
	.then(
        user => {
		const user_info = {
            id: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
        }
        return user_info;
    })
    .then(function (user_info){
        Targil.find({ "user": id })
        .select(['date_creation','targil','targil_duration_msec','targil_number_of_errors','targil_flag_finish','ip'])
        .exec()
        .then(docs => {
            const targil_info = 
            docs.map( doc => {
                return {
                    date_creation: doc.date_creation,
					targil: doc.targil,
					targil_duration_msec: doc.targil_duration_msec,
					targil_number_of_errors: doc.targil_number_of_errors,
                    targil_flag_finish: doc.targil_flag_finish,
                }
            })
        res.render('admin/game-admin-users-list-activity-disp',{"user_info":user_info,"targil_info":targil_info})
        })
    })
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})

    
})
router.get('/game-admin-users-list-activity-disp',authCheck, (req, res) => {
    res.render('admin/game-admin-users-list-activity-disp')
})

/* for Levels  */
router.get('/game-admin-levels-add',authCheck, (req, res) => {
    res.render('admin/game-admin-levels-add')
})
router.get('/game-admin-levels-subtract',authCheck, (req, res) => {
    res.render('admin/game-admin-levels-subtract')
})
router.get('/game-admin-levels-multiply',authCheck, (req, res) => {
    res.render('admin/game-admin-levels-multiply')
})
router.get('/game-admin-levels-division',authCheck, (req, res) => {
    res.render('admin/game-admin-levels-division')
})

/* for tests  */
router.get('/game-admin-test',authCheck, (req, res) => {
    res.render('admin/game-admin-test')
})


module.exports = router;