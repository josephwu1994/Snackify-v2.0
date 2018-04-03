import React, { Component } from 'react';
import Entry from './entry.jsx';
import shortid from 'shortid';

class PhotoGallery extends Component {


	render() {
		// temp. images to test with
		// let tempPics = [
		//     'https://goo.gl/WBG2F4',
		//     'https://goo.gl/34b24F',
		//     'https://goo.gl/ay2Qtc',
		//     'https://goo.gl/3uS5nn',
		//     'https://goo.gl/qyCFzs'
		// ];
		const display = [];
		if (this.props.gallery) {
			for (let i = 0; i < this.props.gallery.length; i++) {
				display.push(<Entry key={this.props.gallery[i].id} userPost={this.props.gallery[i]} usernameLoggedIn={this.props.usernameLoggedIn} commentPost={this.props.commentPost}/>);
			} 
		} else {
			display.push(<div></div>)
		}
		return (
			<div id='photoGallery'>
				{display}
			</div>
		);
	}
}

export default PhotoGallery;