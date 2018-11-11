const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const keys = require('../../app/config/keys');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('request');

const generate_password = require('generate-password');


/*Get all users information*/
router.get('/user-list', (req, res, next) => 
    User.find()
	.select(['email','password','googleInfo'])
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			users: docs.map( doc => {
				return {
					user: doc.email,
                    hash: doc.password,
                    delete: 'http://localhost:3000/api/user/' + doc._id,
                    googleInfo: doc.googleInfo
				}
			})
		}
		res.status(200).json(response);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	})
); 

//sign-up
router.post('/signup-social', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        //user exist
        if (user.length>=1) {
            const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id
                },
                keys.JWT_KEY.secret, {
                    expiresIn: "1h"
                }
            )
            return res.status(200).json({
                massage: "Auth successfull",
                token: token
            });
        //signup if not exist
        } else {
            //automatic generate password
            const password = generate_password.generate({
                length: 10,
                numbers: true
            });
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        googleInfo: req.body.googleInfo,
                        facebookInfo: req.body.facebookInfo,
                        username: req.body.username
                    });
                    user
                    .save()
                    .then(
                        // send token to make it work
                        result => {
                            const token = jwt.sign({
                                email: result.email,
                                userId: result._id
                                },
                                keys.JWT_KEY.secret, {
                                    expiresIn: "1h"
                                }
                            )
                            return res.status(200).json({
                                massage: "Auth successfull",
                                token: token
                            });                          
                        }
                    )       
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        });	
                    });
                }
            });          
        }
    })
    .catch()
});


router.delete('/:userId', (req, res, next) => {
	const id=req.params.userId;
	User.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: "User deleted",
			request: {
				type: 'POST',
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
}); 




module.exports = router;