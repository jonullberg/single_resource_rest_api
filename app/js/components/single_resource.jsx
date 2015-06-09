'use strict';

var React = require('react');
var NoteForm = require('./note_form.jsx');
var NoteList = require('./notes_list.jsx');
var request = require('superagent');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			notes: [],
		};
	},

	componentDidMount: function() {
		this.props.dispatch['NOTES']['READ'](this);
	},

	saveNewNote: function(note) {
		this.props.dispatch['NOTES']['CREATE'](note, this);
	},

	render: function() {
		return (
			<main>
				<h1>{this.props.title}</h1>
				<NoteForm save={this.saveNewNote} labelText="New Note: "buttonText="Save New Note" />
				<NoteList data={this.state.notes} />
			</main>
		)
	}

});