import React, { Component } from 'react';
import Header from './header.jsx';
import SubmissionForm from './submission-form.jsx';
import PhotoGallery from './photoGallery.jsx';
import Footer from './footer.jsx';
import Countdown from 'react-countdown-now';



class App extends Component {
	constructor(props) {
		super(props)
		this.state = {};
		this.deletePost = this.deletePost.bind(this);
		this.voteUp = this.voteUp.bind(this);
		this.commentPost = this.commentPost.bind(this);
		this.submitEntry = this.submitEntry.bind(this);
    this.deleteWeek = this.deleteWeek.bind(this);
	}

	componentDidMount() {
		console.log(`componentDidMount fired!!! `);
		fetch('/test', { credentials: "same-origin" })
			.then(response => response.json())
			.then(myJson => {
				console.log('myJson', myJson);
				this.setState(myJson);
			})
			.catch(err => console.log(err));
	}

	commentPost(content, postid, createdby) {
		fetch('/comment', {
			method: 'POST',
			headers: {
				credentials: "same-origin",
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				content,
				postid,
				createdby
			})
		})
			.then((res) => {
				this.setState({
					gallery: this.state.gallery.map(post => {
						if (post.id === postid) {
							if (post.comments) post.comments.push({ createdby, content });
							else {
								const commentArr = [];
								commentArr.push({ createdby, content });
								post.comments = commentArr;
							}
							return post;
						}
						return post;
					})
				})
			})
	}

	voteUp(username, postby) {
		fetch('/voteup', {
			method: 'POST',
			headers: {
				credentials: 'same-origin',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				postby: postby,
			})
		})
			.then(res => {
				let gallery = this.state.gallery;
				for (let i = 0; i < gallery.length; i++) {
					if (gallery[i].postby === postby) {
						gallery[i].votes = gallery[i].votes + 1;
					}
				}
				let switched = true;
				while (switched === true) {
					let count = 0;
					for (let i = 0; i < gallery.length - 1; i++) {
						if (gallery[i].votes < gallery[i + 1].votes) {
							count++;
							let galleryTemp = gallery[i + 1];
							gallery[i + 1] = gallery[i];
							gallery[i] = galleryTemp;
						}
					}
					if (count === 0) {
						switched = false;
					}
				}

				this.setState({ gallery: gallery });
			})
	};


	deletePost(id, username) {
		fetch('/delete', {
			method: 'POST',
			headers: {
				credentials: "same-origin",
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: id, username: username })
		}).then(result => {
			let gallery = this.state.gallery;
			let outGallery = [];
			for (let i = 0; i < gallery.length; i++) {
				if (gallery[i].postby !== username) {
					outGallery.push(gallery[i]);
				}
			}
			this.setState({ gallery: outGallery, submissioncount: 1 });
		}).catch(err => {
			console.log('ERROR!', err);
		});
 }

  deleteWeek() {
    fetch('/deleteWeek', {
			method: 'POST',
			headers: {
				credentials: "same-origin",
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				num1: this.state.gallery[0].description,
				num2: this.state.gallery[1].description,
				num3: this.state.gallery[2].description, 
			})
		})
    .then(response => {
      this.setState({gallery: [], submissioncount: 1});
    })
    .catch(err => console.log(err));
   }
        
	submitEntry(e) {
		const imageInput = document.getElementById('imageInput').value;
		const commentInput = document.getElementById('commentInput').value;
		fetch('/submission', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				snacklink: imageInput,
				comments : commentInput,
				username : this.state.username,
			}),
		})
		.then(res => res.json())
		.then(json => this.setState({submissioncount: this.state.submissioncount-1, gallery : [...this.state.gallery, { postby: this.state.username, snacklink: imageInput, votes: 0, description: commentInput, id: parseInt(json) }]}))
		.catch(err => err);
	}


	render() {

		const showSubmit = [];
		const gallery = [];
		if (this.state.submissioncount !== undefined && this.state.submissioncount > 0) {
			showSubmit.push(<SubmissionForm submitEntry={this.submitEntry} />);
		} else {
			showSubmit.push(<div></div>);
		}

		if (this.state.gallery !== undefined) {
			gallery.push(<PhotoGallery gallery={this.state.gallery} usernameLoggedIn={this.state.username} commentPost={this.commentPost} voteUp={this.voteUp} deletePost={this.deletePost} />);
		} else {
			gallery.push(<div></div>);
		}
		return (
			<div>
				<Header id='header' username={this.state.username} avatar={this.state.avatar} />
         <div className="timer">
          <Countdown date={'April 5, 2018 21:10:20'} onComplete={this.deleteWeek}/>
         </div>
				{showSubmit}
				{gallery}
				<Footer />
			</div>
		);
	}
}

export default App;

