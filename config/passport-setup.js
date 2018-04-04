const passport = require('passport');
const googleAuth = require('passport-google-oauth20');
const githubStrat = require('passport-github');
const keys = require('./keys');
const db = require('./../server/DB/db');
const userController = require('./../server/Controllers/userController');

//////////////////////////////////////////////
passport.serializeUser((user, done) => {
	// maybe id if _id undefined
	// console.log(user+'<====serializer');
	done(null, user);
	// 'phillip
})

passport.deserializeUser((id, done) => {
	//find _id that matches id 
	// console.log(id+'<=====deserializer');
	done(null, id);
})

////////////////////////////////////////////
// passport.use(
// 	new googleAuth({
// 		//google strat
// 		callbackURL: '/auth/google/redirect',
// 		clientID: keys.google.clientID,
// 		clientSecret: keys.google.clientSecret,
// 	}, () => {

// 	}
// 	));
///////////////////////////////////
passport.use(
	new githubStrat({
		callbackURL: '/auth/github/redirect',
		clientID: keys.github.clientID,
		clientSecret: keys.github.clientSecret,
	}, (accessToken, refreshToken, profile, done) => { userController.createUser(profile, done) 
	})
);