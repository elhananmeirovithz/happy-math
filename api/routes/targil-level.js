const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const TargilLevel = require('../models/targil-level');

/*Get all targil information*/
/*http://localhost:3000/api/targilLevel/targilLevel-list/ */
router.get('/targilLevel-list', (req, res, next) => {
	TargilLevel.find()
	.select()
	// .select(['user','date_creation','targil','targil_duration_msec','targil_number_of_errors','targil_flag_finish','ip'])
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
}); 

/*http://localhost:3000/api/targilLevel/targilLevel-list-add/ */
router.post('/targilLevel-list-add', (req, res, next) => {
	console.log(req.body);
	const targilLevel = new TargilLevel({
		_id: new mongoose.Types.ObjectId(),
		type: "add",
		level: req.body.level,
		numberLength1: req.body.numberLength1,
		numberLength2: req.body.numberLength2
	});
	console.log(targilLevel);
	targilLevel
	.save()
	.then(
	res.redirect("../../admin/game-admin-levels-add"))
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});	
	});
});


router.get('/delete/:targilLevelID', (req, res, next) => {
	const id=req.params.targilLevelID;
	console.log(id);
	TargilLevel.deleteOne({ _id: id })
	.exec()
	.then(
		res.redirect("../../../admin/game-admin-levels-add")
		)
	.catch(err => {
		res.redirect("../../../admin/game-admin-levels-add")
	});
}); 



module.exports = router;