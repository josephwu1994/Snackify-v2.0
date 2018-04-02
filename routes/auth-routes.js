const router = require('express').Router();
const passport = require('passport');

//need to build this page...
router.get('/login', (req, res) => {
	res.send('login');
})


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
	res.send('logged out');
})



module.exports = router;