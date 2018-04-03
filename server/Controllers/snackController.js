const db = require('./../DB/db');

const snackController = {};

snackController.submitSnack = (req, res) => {

	db.query(`SELECT submissioncount from u where username = '${req.body.username}';`, (err, count) => {
		console.log(JSON.stringify(count)+"<==== this is count");
		if (count.rows[0].submissioncount === 0) {
			res.send('You Eat Too Much');
		} else {
			db.query(`UPDATE u SET submissioncount = submissioncount -1 WHERE username = '${req.body.username}';
				  INSERT INTO post (snacklink, description, postby, votes) VALUES ('${req.body.snacklink}', '${req.body.comments}', '${req.body.username}', 0);`,
				(err, result) => {
					if (err) throw new Error(err);
					res.send('successfully posted');
				});
		}
	});
}

snackController.deleteSnack = (req, res) => {
	const deleteQuery = `Delete from "post" where id = ${req.body.id} and postby = '${req.body.username}';`;
	db.query(deleteQuery, (err, result) => {
		if (err || !result.rows[0]) {
			res.status(400).json({error: "cannot delete post"});
		} else if (result) {
			res.status(200).send('successfully deleted');
		}
	});
}


snackController.grabSnack = (req, res, next) => {
	db.query(`SELECT postby FROM post order by votes desc;
						SELECT snacklink FROM post order by votes desc;
						SELECT votes FROM post order by votes desc;
						SELECT description FROM post order by votes desc;
						SELECT id FROM post order by votes desc;`, (err, result) => {
			const resultArr = [];

			const rows = result.map((col) => {
				return col.rows;
			})
			for (let i = 0; i < rows[0].length; i++) {
				const userObj = {};
				userObj.postby = rows[0][i].postby;
				userObj.snacklink = rows[1][i].snacklink;
				userObj.votes = rows[2][i].votes;
				userObj.description = rows[3][i].description;
				userObj.id = rows[4][i].id;
				resultArr.push(userObj);
			}
			resultArr.forEach((post, i) => {
				db.query(`SELECT createdby, content FROM comments where postid = '${post.id}';`, (err , body) => {
					if(body.rows[0] !== undefined){
						post.comments = body.rows;
					}
					if( i === resultArr.length-1){
						res.locals.result = resultArr;
						next();
					}
				});
			})
		});
}

snackController.incrementVotes = (req, res, next) => {
	db.query(`UPDATE post SET votes = votes +1 where postby = '${req.body.postby}';`, (err, body) => {
		if(err) throw err;
		next();
	})
}

snackController.addComment = (req, res) => {
	req.body.content = req.body.content.split('').map((w) => {
		if (w==="\'") {
			return "\'\'";
		}
		return w;
	}).join('');
	db.query(`INSERT INTO comments (postid, createdby, content) VALUES (${req.body.postid}, '${req.body.createdby}', '${req.body.content}');`, (err, body) => {
		if(err) throw err;
		res.json('Successfully posted Comments');
	});
}

module.exports = snackController;