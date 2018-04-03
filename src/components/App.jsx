import React, {Component} from 'react';
import Header from './header.jsx';
import SubmissionForm from './submission-form.jsx';
import PhotoGallery from './photoGallery.jsx';
import Footer from './footer.jsx';

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount() {
        console.log(`componentDidMount fired!!! `);
        fetch('/test', {credentials: "same-origin"})
        .then(response => response.json())
        .then(myJson => {
					console.log(myJson);
					this.setState(myJson);
					console.log(this.state + "<==== this.state");
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

    render(){
        return (
            <div>
                <Header id='header' username={this.state.username}  avatar={this.state.avatar} />
                <SubmissionForm username={this.state.username} />
                <PhotoGallery gallery={this.state.gallery} usernameLoggedIn={this.state.username} />
                <Footer />
            </div>
        );
    }
}

export default App;

