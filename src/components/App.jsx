import React, { Component } from 'react';
import Header from './header.jsx';
import SubmissionForm from './submission-form.jsx';
import PhotoGallery from './photoGallery.jsx';
import Footer from './footer.jsx';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {};
		this.commentPost = this.commentPost.bind(this);
	}

	componentDidMount() {
		console.log(`componentDidMount fired!!! `);
		fetch('/test', { credentials: "same-origin" })
			.then(response => response.json())
			.then(myJson => {
				console.log(myJson);
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
			this.setState({gallery: this.state.gallery.map(post => {
				if(post.id === postid) {
					if(post.comments) post.comments.push({createdby, content});
					else {
						const commentArr = [];
						commentArr.push({createdby, content});
						post.comments = commentArr;
					}
					return post;
				}
				return post;
			})
		})
	})
}

render(){
	return (
		<div>
			<Header id='header' username={this.state.username} avatar={this.state.avatar} />
			<SubmissionForm username={this.state.username} />
			<PhotoGallery gallery={this.state.gallery} usernameLoggedIn={this.state.username} commentPost={this.commentPost}/>
			<Footer />
		</div>
	);
}
}

export default App;

