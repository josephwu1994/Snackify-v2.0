import React, { Component } from 'react';

class SubmissionForm extends Component {
	
	render() {
		return (
			<div id='submissionForm'>
				<h1> Add your Snack </h1>
				{/* add action and method!!!! */}
				<input className="subInput" id="imageInput" placeholder="Image URL" type='text' name='image' />
				<input className="subInput" id="commentInput" placeholder="Enter a description" type='text' name='comment' />
				<button className="subBtn" type='submit' onClick={this.props.submitEntry} > Add Snack </button>
			</div>
		);
	}
}

export default SubmissionForm;