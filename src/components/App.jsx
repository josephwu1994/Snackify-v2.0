import React, {Component} from 'react';
import Header from './header.jsx';
import SubmissionForm from './submission-form.jsx';
import PhotoGallery from './photoGallery.jsx';
import Footer from './footer.jsx';

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {};
        this.deletePost = this.deletePost.bind(this);
		this.voteUp = this.voteUp.bind(this);
    }

    componentDidMount() {
        console.log(`componentDidMount fired!!! `);
        fetch('/test', {credentials: "same-origin"})
        .then(response => response.json())
        .then(myJson => {
					console.log('myJson', myJson);
					this.setState(myJson);
        })
				.catch(err => console.log(err));

				// fetch('/gallery', {credentials: "same-origin"})
				// .then(res => res.json())
				// .then(myJson => {
				// 	console.log(myJson);
				// 	this.setState({gallery: myJson});
				// 	console.log(this.state);
				// })
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
            this.setState({gallery: gallery});
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
            this.setState({gallery: outGallery});
		}).catch(err => {
			console.log('ERROR!', err);
		});
    }
    

    render(){
        return (
            <div>
                <Header id='header' username={this.state.username}  avatar={this.state.avatar} />
                <SubmissionForm username={this.state.username} />
                <PhotoGallery gallery={this.state.gallery} usernameLoggedIn={this.state.username} voteUp={this.voteUp} deletePost={this.deletePost}/>
                <Footer />
            </div>
        );
    }
}

export default App;

