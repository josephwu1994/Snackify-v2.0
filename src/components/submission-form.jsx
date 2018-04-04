import React, { Component } from 'react';

class SubmissionForm extends Component {
	
	render() {
		return (
			<div id='submissionForm'>
				<h1>Add your Snack!!!</h1>
				{/* add action and method!!!! */}
				Image: <input id="imageinput" type='text' name='image' /> <br />
				Comment: <input id="commentinput" type='text' name='comment' /> <br />
				<button type='submit' onClick={this.props.submitEntry} > Add Snack </button>
			</div>
		);
	}
}

export default SubmissionForm;