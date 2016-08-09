import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ListDashboard = React.createClass({ 
	getInitialState: function(){
		return(
			{
				lists: [
			  		{
			  			title: 'To Do',
			    		cards: [
			      			{text: 'do something'},
			      			{text: 'do something else'}
			    		]
			    	},
			    	{
				    	title: 'In Progress',
			    		cards: [
			      			{text: 'doing something'}
			    		]
			    	}	
			  	],
			  	formOpen: false
			}
		);
	},
	toggleForm: function(){
		this.setState({formOpen: !this.state.formOpen});
	},
	addNote: function(noteText){
		this.toggleForm();
		const lists = this.state.lists;
		lists[this.state.currentList].cards.push({text: noteText});
		this.setState({lists: lists});
	},
	addNoteForm: function(list){
		this.toggleForm();
		this.setState({currentList: list});
	},
	render: function () {
		const lists = this.state.lists.map((list, i) => {
			return(
				<List 
					key={"list-" + i}
					index={i}
					title={list.title}
					cards={list.cards}
					onForm={this.addNoteForm}
				/>
			);
		});
		let noteForm;
		if (this.state.formOpen) {
		  	noteForm = <NoteForm onForm={this.toggleForm} onAdd={this.addNote}/>;
		} else {
		  	noteForm = "";
		}
		return(
			<div className="wrapper">
				{lists}
				{noteForm}
			</div>
		);
	}
});

const List = React.createClass({ 
	toggleForm: function(){
		this.props.onForm(this.props.index);
	},
	render: function () {
		const notes = this.props.cards.map((card, i) => {
			return(
				<Note 
					key={"note-" + i}
					text={card.text}
				/>
			);
		});
		return(
			<div className="column">
	            <div className="column-header">
	                <p className="header-title">
						{this.props.title}
	                </p>
	                <p className="delete">x</p>
	            </div>
	            {notes}
	            <button className="add-card" onClick={this.toggleForm}>+</button>
	        </div>
		);
	}
});

const Note = React.createClass({ 
	render: function () {
		return(
			<div className="note-container">
			    <i className="pin"></i>
			    <p className="note yellow">
					{this.props.text}
			    </p>
			</div>
		);
	}
});

const NoteForm = React.createClass({ 
	toggleForm: function(){
		this.props.onForm();
	},
	addNote: function(){
		console.log(this.refs.noteText.value);
		this.props.onAdd(this.refs.noteText.value);
	},
	render: function () {
		return(
			//modal form
			<div className="add-card-modal modal">
		        <div className="card-selection">
		            <div className="note-card-selection">
		                <textarea ref="noteText" className="note-input note yellow" type="text" placeholder="Enter note text here"></textarea> 
		                <button className="new-note-submit cancel" onClick={this.toggleForm}>Cancel</button>
		                <button className="new-note-submit add" onClick={this.addNote}>Add Note</button>
		            </div>
		        </div>
		    </div>
		);
	},
});


ReactDOM.render(
	<ListDashboard />,
	document.getElementById('root')
);