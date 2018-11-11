const express = require('express');
const app = express(); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('./app/config/keys');
const passport = require('passport');

//app routes
const passportSetup = require ('./app/config/passport-setup');// just to make it run
const mongooseSetup = require ('./app/config/db_connect');// just to make it run
const authRoutes = require('./app/routes/auth-routes'); // this make the product.js have only one / without the foulder
const gameMath1Routes = require('./app/routes/game-math1'); 


//api routes
const api_userRoutes = require('./api/routes/user');

// set up view engine
app.set('view engine', 'ejs')

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}))
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use(morgan('dev'));
//Handles post requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// to prevent curs errors when server block the information
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); //http:/neuroapplied.com it can be instaed of the *
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Accept, Authorization, Content-Type'
	); // * or accept 
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET'); 
		return res.status(200).json({});
	}
	next();
});


app.use('/auth',authRoutes);//handling the name of the rout
app.use('/game-math1',gameMath1Routes);//handling the name of the rout
app.use('/api/user',api_userRoutes);//handling the name of the rout


// create home route
app.get('/',(req, res) => {
 	res.render('home', {user: req.user});
 })


// // if no privios rows call the function
// app.use(function (req, res, next) {
//     var err = new Error("Not Found");   //this line :)
//    	err.status = '404';
//     next(err);
// });

module.exports = app;