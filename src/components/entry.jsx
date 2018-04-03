import React, { Component } from 'react';
import Comment from './Comment.jsx';
import shortid from 'shortid';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';

class Entry extends Component {

  voteUp() {
    fetch('/voteup', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
        username: this.props.username,
        postby: this.props.userPost.postby,
			})
      .then(res => res.json())
      .then(json => alert(json))
    });
  }

  render() {
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
            <div>{this.props.userPost.username}</div>
            <img className='entryImg' src={this.props.userPost.snackPhoto} />
            {commentDisplay}
    <div className="votes">{this.props.userPost.votes}</div>
            <button className="thumbsBtn" onClick={this.voteUp}><ThumbsUp className="thumbs" /></button>
        </div>
    );
  }
}

export default Entry;