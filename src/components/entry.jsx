import React, { Component } from 'react';
import Comment from './Comment.jsx';
import shortid from 'shortid';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';

class Entry extends Component {
    constructor(props){
		super(props)
		this.deletePost = this.deletePost.bind(this);
    this.voteUp = this.voteUp.bind(this);
	}

  voteUp() {
    fetch('/voteup', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
        username: this.props.usernameLoggedIn,
        postby: this.props.userPost.postby,
			})
      .then(res => res.json())
      .then(json => alert(json))
    });
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
        let commentDisplay = [];
        if(this.props.userPost.comments !== undefined) {
           commentDisplay = this.props.userPost.comments.map( (comment, i) => {
            return <Comment key={(i+shortid.generate()).toString()} commentInfo ={comment} />
          })
        } else {
          commentDisplay.push(<div className="None"></div>);
        }

        return (
            <div className='entry'>
              <div>{this.props.userPost.postby}</div>
              <img className='entryImg' src={this.props.userPost.snacklink} />
              {commentDisplay}
              <div className="votes">{this.props.userPost.votes}</div>
              <button className="thumbsBtn" onClick={this.voteUp}><ThumbsUp className="thumbs" /></button>
            </div>
        );
    } else {
        return (
            <div className='entry'>
              <div>{this.props.userPost.postby}</div>
              <img className='entryImg' src={this.props.userPost.snacklink} />
              {commentDisplay}
              <div className="votes">{this.props.userPost.votes}</div>
              <button className="thumbsBtn" onClick={this.voteUp}><ThumbsUp className="thumbs" /></button>
            </div>
        )
      }
    }

    
}

export default Entry;