import React, { Component } from 'react';

class Comment extends Component {



	render() {
		return (
			<div className="comments">{this.props.commentInfo.createdby+": "+ this.props.commentInfo.content}	</div>
		)
	};
}

export default Comment;

