import React, { Component } from 'react';

class Entry extends Component {
    constructor(props){
		super(props)
		this.deletePost = this.deletePost.bind(this);
	}

    deletePost(id, username) {
        fetch('/delete', {
            method: 'POST',
            headers: {
                credentials: "same-origin",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, username: username})
          }).then(result => {
              location.reload();
        }).catch(err => {
            console.log('ERROR!', err);
          });
    }

    render() {
        let id;
        let username;
        if (this.props.usernameLoggedIn === this.props.userPost.username) {
        return (
            <div className='entry'>
                <div>{this.props.userPost.username}</div>
                <img className='entryImg' src={this.props.userPost.snackPhoto} />
                <div className="comments">{this.props.userPost.comments}</div>
								<div className="votes">{this.props.userPost.votes}</div>
                                <button className="ThumbsUp" />
                                <button onClick={(e) => {id=this.props.userPost.id; username=this.props.userPost.username; this.deletePost(id, username)}}>Delete</button>
            
            </div>
        );
    } else {
        return (
            <div className='entry'>
                <div>{this.props.userPost.username}</div>
                <img className='entryImg' src={this.props.userPost.snackPhoto} />
                <div className="comments">{this.props.userPost.comments}</div>
								<div className="votes">{this.props.userPost.votes}</div>
                                <button className="ThumbsUp" />
                </div>
        )}
    }
}

export default Entry;