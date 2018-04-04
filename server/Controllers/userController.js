const db = require('./../DB/db');

const userController = {};

userController.createUser = (profile, done) => {
	db.query(`SELECT username from u where username = '${profile.username}';`, (err, result) => {
		if (err) throw err;
		if (result.rows.length === 0) {
			db.query(`INSERT into u (username, avatar, votecount, submissioncount) 
			VALUES ('${profile.username}', '${profile.photos[0].value}',3 , 1);`, (err, user) => {
					if (err) console.log('Im the error from insert ' + err);
					db.query(`SELECT * from u where username = '${profile.username}';`, (err, user) => {
						done(null, user.rows[0].username);
					});
				});
		} else {
			db.query(`SELECT * from u where username = '${profile.username}';`, (err, user) => {
				done(null, JSON.stringify(user.rows[0]));
			});
		}
	});
}

userController.handleDelete = (req, res) => {
	db.query(`UPDATE u SET submissioncount = submissioncount +1 WHERE username = '${req.body.username}';`, (err, result) => {
		if(err) res.status(400).send('You FAILED');
		res.status(200).send('Submit one more');
	})
}

userController.handleVote = (req, res) => {
	db.query(`UPDATE u SET votecount = votecount -1 WHERE username = '${req.body.username}';`, (err, result) => {
		res.json('Thanks for Voting');
	})
}

userController.resetAllSubCounts = (req, res, next) => {
	console.log('in reset user submission counts');
	const resetSubCountsQuery = `Update u set submissioncount = 1 where id > 0;`
	db.query(resetSubCountsQuery, (err, posts) => {
		if (err) throw err;
		next();
	})
}

module.exports = userController;