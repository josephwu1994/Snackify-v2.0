const express = require('express');
const authRoutes = require('./routes/auth-routes');
const path = require('path');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./server/DB/db');
const snackController = require('./server/Controllers/snackController');
const userController = require('./server/Controllers/userController');
const nodemailer = require('nodemailer');

const app = express();

app.use('/build', express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: keys.gmail.user,
		pass: keys.gmail.pass,
	}
})



app.use('/auth', authRoutes);

//////home/////

app.get('/', (req, res) => {
	if (req.user) res.sendFile(path.join(__dirname, 'index.html'));
	else res.redirect('/auth/login');
});

app.post('/submission', snackController.submitSnack);

app.post('/delete', snackController.deleteSnack, userController.handleDelete);
//=================================================================

app.get('/test', snackController.grabSnack, snackController.getCountdown, (req, res) => {
	req.user = JSON.parse(req.user);
	req.user.gallery = res.locals.result;
	req.user.date = res.locals.date;
	console.log("this is the date from the db", res.locals.date);
	res.json(req.user);
});


app.post('/deleteWeek', snackController.countdownReset, snackController.deleteComments, snackController.deletePosts, userController.resetAllSubCounts, (req, res) => {
	transporter.sendMail({
		from: 'snackifyemailer@gmail.com',
		to: 'mmb296@cornell.edu',
		subject: 'It WORKS!',
		text: `Winner goes to ---------->  ${req.body.num1}
					 RunnerUp ---------> ${req.body.num2} and ${req.body.num3}`
	}, (err, info) => {
		if (err) res.json(err);
		else res.json('successfully sent');
	});
});

app.post('/voteup', snackController.incrementVotes,
	userController.handleVote
);

app.post('/comment', snackController.addComment);

app.get('/email', (req, res) => {
	
});

app.listen(3000, () => {
	console.log('listening on port 3000...');
});




