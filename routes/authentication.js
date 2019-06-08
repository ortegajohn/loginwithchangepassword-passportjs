const express = require('express');
const expressRouter = express.Router();

const { isNotLoggedIn } = require('../lib/helper_auth');
const { isLoggedIn } = require('../lib/helper_auth');

const passport = require('passport');

expressRouter.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
});

expressRouter.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

expressRouter.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

expressRouter.post('/signin', isNotLoggedIn, passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
}), function(){
    console.log("signin: ",signin)
});

expressRouter.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

//changePassword//changePassword//changePassword
//changePassword//changePassword//changePassword
//changePassword//changePassword//changePassword
//changePassword//changePassword//changePassword

expressRouter.get('/changepassword', isLoggedIn, (req, res) => {
    res.render('auth/changepassword');
});

expressRouter.post('/changepassword', isLoggedIn, passport.authenticate('local.changepassword', {
    successRedirect: '/',
    failureRedirect: '/changepassword',
    failureFlash: true
}));


//changePassword//changePassword//changePassword
//changePassword//changePassword//changePassword
//changePassword//changePassword//changePassword
//changePassword//changePassword//changePassword

module.exports = expressRouter;