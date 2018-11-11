const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const facebookStrategy = require('passport-facebook');

const keys = require('./keys');
const request = require('request')
const User = require('../../api/models/user');
const mongoose = require('mongoose');
const generate_password = require('generate-password');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for google strategies
        callbackURL:'/auth/google/redirect',//the redirect to ???
        clientID: keys.google.ClientID,
        clientSecret: keys.google.ClientSecret,
    },//fire in the first time
    //passport callback function
    function(accessToken, refreshToken, profile, done) {
        // check if user allready exist in the database
        User.findOne({email:profile.emails[0].value})
        .then(currentUser =>{
            if(currentUser){
                //already have the user
                //console.log('user is:', currentUser);
                done(null,currentUser);
            } else {
                const password = generate_password.generate({
                    length: 10,
                    numbers: true
                });
                new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: profile.emails[0].value,
                    password: password,
                    googleInfo: profile._raw,
                    googleId: profile.id,
                    username: profile.displayName
                })
                .save()
                .then(newUser => {
                    //console.log('new user created:', newUser);
                    done(null,newUser);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            }
        })        
    }
));//fire next

passport.use(
    new facebookStrategy({
        //options for google strategies
        callbackURL:'/auth/facebook/redirect',//the redirect to ???
        clientID: keys.facebook.ClientID,
        clientSecret: keys.facebook.ClientSecret,
        profileFields: ['id', 'email', 'birthday','displayName']
    },//fire in the first time
    //passport callback function
    function(accessToken, refreshToken, profile, done) {
        // check if user allready exist in the database
        User.findOne({email:profile.emails[0].value})
        .then(currentUser =>{
            if(currentUser){
                //already have the user
                //console.log('user is:', currentUser);
                done(null,currentUser);
            } else {
                const password = generate_password.generate({
                    length: 10,
                    numbers: true
                });
                new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: profile.emails[0].value,
                    password: password,
                    facebookInfo: profile._json,
                    facebookId: profile.id,
                    username: profile.name
                })
                .save()
                .then(newUser => {
                    //console.log('new user created:', newUser);
                    done(null,newUser);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            }
        })       
    }
));//fire next