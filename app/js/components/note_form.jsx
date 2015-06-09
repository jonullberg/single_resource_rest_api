'use strict';

var React = require('react');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			note: {
				noteBody: ''
			}
		};
	},

	handleChange: function(event) {
		this.state.note[event.target.name] = event.target.value;
		this.forceUpdate();
	},

	handleSubmit: function(event) {
		event.preventDefault();
		this.props.save(this.state.note);
		this.setState({note: {noteBody: ''}});
	},

	render: function() {
		return (
			<form name="note-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
				<label for="noteBody">{this.props.labelText}</label>
				<input type="text" name="noteBody" value={this.state.note.noteBody} />
				<button type="submit">{this.props.buttonText}</button>
			</form>
		);
	}
});