import React, { Component } from 'react';
import Comment from './Comment.jsx';
import shortid from 'shortid';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';

class Entry extends Component {
	constructor(props) {
		super(props)
		this.state = {
			content : '',
		}
		this.textHandle = this.textHandle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	textHandle(e) {
		this.setState({content: e.target.value});
	}
	handleSubmit() {
		this.props.commentPost(this.state.content, this.props.userPost.id, this.props.usernameLoggedIn);
		this.setState({content: ''});
	}
  
	render() {
		let id;
		let username;
		let commentDisplay = [<div className="None"></div>];

		if (this.props.userPost.comments !== undefined) {
			commentDisplay = this.props.userPost.comments.map((comment, i) => {
				return <Comment key={(i + shortid.generate()).toString()} commentInfo={comment} />
			})
		}
		if (this.props.usernameLoggedIn === this.props.userPost.postby) {
		
			return (
				<div className='entry'>
					<div>{this.props.userPost.postby}</div>
					<img className='entryImg' src={this.props.userPost.snacklink} />
					{commentDisplay}
					<div className="votes">{this.props.userPost.votes}</div>
					<button className="thumbsBtn" onClick={() => {this.props.voteUp(this.props.usernameLoggedIn, this.props.userPost.postby)} }><ThumbsUp className="thumbs" /></button>
					<button className="deleteBtn" onClick={() => { this.props.deletePost(this.props.userPost.id, this.props.usernameLoggedIn) }} > Delete </button>
					<input className="commentInput" onChange={this.textHandle} value={this.state.content}/>
					<button className="commentBtn" onClick={this.handleSubmit}> reply </button>
				</div>
			);
		} else {
			return (
				<div className='entry'>
					<div>{this.props.userPost.postby}</div>
					<img className='entryImg' src={this.props.userPost.snacklink} />
					{commentDisplay}
					<div className="votes">{this.props.userPost.votes}</div>
					<button className="thumbsBtn" onClick={() => {this.props.voteUp(this.props.usernameLoggedIn, this.props.userPost.postby)}}><ThumbsUp className="thumbs" /></button>
					<input className="commentInput" onChange={this.textHandle} value={this.state.content}/>
					<button className="commentBtn" onClick={this.handleSubmit}> reply </button>
				</div>
			)
		}
	}
}

export default Entry;