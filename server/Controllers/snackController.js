const db = require('./../DB/db');

const snackController = {};

snackController.submitSnack = (req, res) => {
	db.query(`SELECT submissioncount from u where username = '${req.body.username}';`, (err, count) => {
		console.log(JSON.stringify(count) + "<==== this is count");
		if (count.rows[0].submissioncount === 0) {
			res.send('You Eat Too Much');
		} else {
			db.query(`UPDATE u SET submissioncount = submissioncount -1 WHERE username = '${req.body.username}';
						INSERT INTO post (snacklink, description, postby, votes) VALUES ('${req.body.snacklink}', '${req.body.comments}', '${req.body.username}', 0);`,
				(err, result) => {
					if (err) throw err;
					res.send('successfully posted');
				});
		}
	});
}

snackController.deleteSnack = (req, res, next) => {
	const deleteComments = `Delete from comments where postid = ${req.body.id};`;
	const deleteQuery = `Delete from "post" where id = ${req.body.id} and postby = '${req.body.username}';`;
	db.query(deleteComments + deleteQuery, (err, result) => {
		if (err) {
			res.status(400).json({ error: "cannot delete post" });
		} else if (result) {
			res.status(200);
			next();
		}
	});
}


snackController.grabSnack = (req, res, next) => {
	db.query(`SELECT postby, snacklink, votes, description, id FROM post order by votes desc;`,
		(err, result) => {
			const resultArr = [];
			if (result.rows.length > 0) {
				const rows = result.rows;
				for (let i = 0; i < rows.length; i++) {
					const userObj = {};
					userObj.postby = rows[i].postby;
					userObj.snacklink = rows[i].snacklink;
					userObj.votes = rows[i].votes;
					userObj.description = rows[i].description;
					userObj.id = rows[i].id;
					resultArr.push(userObj);
				}
				resultArr.forEach((post, i) => {
					db.query(`SELECT createdby, content FROM comments where postid = '${post.id}';`, (err, body) => {
						if (body.rows[0] !== undefined) {
							post.comments = body.rows;
						}
						if (i === resultArr.length - 1) {
							res.locals.result = resultArr;
							next();
						}
					});
				})
			} else {
				res.locals.result = resultArr;
				next();
			}
		});
}

snackController.incrementVotes = (req, res, next) => {
	db.query(`UPDATE post SET votes = votes +1 where postby = '${req.body.postby}';`, (err, body) => {
		if (err) throw err;
		next();
	})
}

snackController.addComment = (req, res) => {
	req.body.content = req.body.content.split('').map((w) => {
		if (w === "\'") {
			return "\'\'";
		}
		return w;
	}).join('');
	db.query(`INSERT INTO comments (postid, createdby, content) VALUES (${req.body.postid}, '${req.body.createdby}', '${req.body.content}');`, (err, body) => {
		if (err) throw err;
		res.json('Successfully posted Comments');
	});
}


module.exports = snackController;