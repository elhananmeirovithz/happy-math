const mongoose = require('mongoose');
const keys = require('./keys');

mongoose.connect(keys.mongodb.dbURL,
	{
		 //useNewUrlParser: true
		 useCreateIndex: true,
		 useNewUrlParser: true
	}// new parser
	// {
	// 	useMongoClient: true
	// } //old version
);

module.exports = mongoose;