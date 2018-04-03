import React, { Component } from 'react';

class SubmissionForm extends Component {
	constructor(props){
		super(props)
		this.submitEntry = this.submitEntry.bind(this);
	}
	

	submitEntry(e) {
		const imageInput = document.getElementById('imageinput').value;
		const commentInput = document.getElementById('commentinput').value;
		fetch('/submission', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				snackLink: imageInput,
				comments: commentInput,
				userName: this.props.username,
			}),
		}).then(res => console.log(res))
			.catch(err => err);
		location.reload();
	}


	render() {
		return (
			<div id='submissionForm'>
				<h1>Add your Snack!!!</h1>
				{/* add action and method!!!! */}
				Image: <input id="imageinput" type='text' name='image' /> <br />
				Comment: <input id="commentinput" type='text' name='comment' /> <br />
				<button type='submit' onClick={(e)=>{this.submitEntry(e)}} > Add Snack </button>
			</div>
		);
	}
}

export default SubmissionForm;