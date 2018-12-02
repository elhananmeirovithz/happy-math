const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Targil = require('../models/targil');

/*Get all targil information*/
/*http://localhost:3000/api/targil/targil-list/ */
router.get('/targil-list', (req, res, next) => 
    Targil.find()
	.select(['user','date_creation','targil','targil_duration_msec','targil_number_of_errors','targil_flag_finish','ip'])
	.exec()
	.then(docs => {
		const response = docs;
		res.status(200).json(response);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
); 


/*
// http://localhost:3000/api/targil/targil-add
// 
header = >
Content-Type:application/json
body = >
{
	"user":"5c026d879937fb3f74312291",
	"targil": "1 + 1",
	"targil_duration_msec": 145,
	"targil_number_of_errors": 6,
    "targil_flag_finish": "true",
}
*/
router.post('/targil-add',  (req, res, next) => {
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress || 
            req.connection.socket.remoteAddress;
        ip = ip.split(',')[0];
        // ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"     
    User.findById(req.body.user)
    .then(user => {
        const targil = new Targil({
            _id: mongoose.Types.ObjectId(),
            user: req.body.user,
            targil: req.body.targil,
            targil_duration_msec: req.body.targil_duration_msec,
            targil_number_of_errors: req.body.targil_number_of_errors,
            targil_flag_finish: req.body.targil_flag_finish,
            ip: ip
        });
        return targil.save();
    })
    .then(result => {
        res.status(201).json({
            massage: 'success'
        })
    })
    .catch(err => { 
        console.log(err);
        res.status(500).json({
            message: "User not found",
            error: err
        });	
    });
});



module.exports = router;