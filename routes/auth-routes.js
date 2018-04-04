const router = require('express').Router();
const passport = require('passport');
const path = require('path');

//need to build this page...
router.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, './../login.html'));
})

router.get('/login.css', (req, res) => {
	res.sendFile(path.join(__dirname, './../public/login.css'));
});

router.get('/github', passport.authenticate('github', {
	scope: ['profile']
}));


router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
	//user info is stored on req.user
	console.log(req.user, '<== req.user from gh/redirect route');
	res.redirect('/');
});

//need to build this page ...
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/auth/login');
})





module.exports = router;