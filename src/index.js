import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ListDashboard = React.createClass({ 
	getInitialState: function(){
		return(
			{
				lists: [
			  		{
			  			title: 'TO DO',
			    		cards: [
			      			{text: 'Walk the dog'},
			      			{text: 'Pick up dry cleaning'}
			    		]
			    	},
			    	{
				    	title: 'IN PROGRESS',
			    		cards: [
			      			{text: 'Laundry'}
			    		]
			    	}	
			  	],
			  	formOpen: false,
			  	listFormOpen: false,
			  	editFormOpen: false
			}
		);
	},
	toggleForm: function(){
		this.setState({formOpen: !this.state.formOpen});
	},
	toggleListForm: function(){
		this.setState({listFormOpen: !this.state.listFormOpen});
	},
	toggleEditForm: function(){
		this.setState({editFormOpen: !this.state.editFormOpen});
	},
	addList: function(listTitle){
		this.toggleListForm();
		const lists = this.state.lists;
		lists.push({title: listTitle, cards: []});
		this.setState({lists: lists});
	},
	editListName: function(listTitle){
		this.toggleListForm();
		const lists = this.state.lists;
		//do I still need to have an empty cards array if i'm not adding a new list?
		lists.text({title: listTitle});
		this.setState({lists: lists});
	},
	// deleteList: function(listId){
	// 	this.setState({lists: this.state.lists.filter(l => l.id !== listId)});
	// },
	addNote: function(noteText){
		this.toggleForm();
		const lists = this.state.lists;
		lists[this.state.currentList].cards.push({text: noteText});
		this.setState({lists: lists});
	},
	editNote: function(noteText){
		this.toggleEditForm();
		const lists = this.state.lists;
		lists[this.state.currentList].cards[this.state.currentCard].text=noteText;
		this.setState({lists: lists});
	},
	addNoteForm: function(list){
		this.toggleForm();
		this.setState({currentList: list});
	},
	editNoteForm: function(list, card, text){
		this.toggleEditForm();
		this.setState({currentList: list, currentCard: card, currentText: text});
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
					onEditForm={this.editNoteForm}
					// onDelete={this.deleteList}
				/>
			);
		});
		let noteForm, listForm, editForm;
		if (this.state.formOpen) {
		  	noteForm = <NoteForm onForm={this.toggleForm} onAdd={this.addNote}/>;
		} else {
		  	noteForm = "";
		}
		if (this.state.listFormOpen) {
		  	listForm = <ListForm onForm={this.toggleListForm} onAdd={this.addList}/>;
		} else {
		  	listForm = "";
		}
		if (this.state.editFormOpen) {
		  	editForm = <EditNoteForm onForm={this.toggleEditForm} onAdd={this.editNote}/>;
		} else {
		  	editForm = "";
		}
		return(
			<div className="wrapper">
				{lists}
				<div className="column">
				    <div className="column-header">
				        <p className="header-title">ADD LIST</p>
				    </div>
				    <button className="add-list" onClick={this.toggleListForm}>+</button>
				</div>
				{noteForm}
				{listForm}
				{editForm}
			</div>
		);
	}
});

const List = React.createClass({ 
	toggleForm: function(){
		this.props.onForm(this.props.index);
	},
	toggleListForm: function(){
		this.props.onForm(this.props.index);
	},
	addList: function(listTitle){
		toggleListForm();
		const lists = this.state.lists;
		lists.push({text: listTitle});
		this.setState({lists: lists});
	},
	editListName: function(listTitle){
		toggleListForm();
		const lists = this.state.lists;
		//do I still need to have an empty cards array if i'm not adding a new list?
		lists.text({title: listTitle});
		this.setState({lists: lists});
	},
	// deleteList: function(listId){
	// 	const lists = this.state.lists;
	// 	this.setState({
	// 		lists: lists.filter(_, l => l !== listId)
	// 	});
	// },
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
	            <div className="column-header" onClick={this.toggleListForm}>
	                <p className="header-title">
						{this.props.title}
	                </p>
	                <p className="delete" onClick={this.deleteList}>x</p>
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
		this.props.onAdd(this.refs.noteText.value);
	},
	render: function () {
		return(
			//add note modal form
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

const ListForm = React.createClass({ 
	toggleListForm: function(){
		this.props.onForm();
	},
	addList: function(){
		this.props.onAdd(this.refs.listTitle.value);
	},
	render: function () {
		//can i do an if statement here to toggle the list form with either submit or add?
		return(
			//add list modal form
			<div className="add-list-modal modal">
			    <div className="list-selection">
			        <div className="note-list-selection">
			            <input ref="listTitle" className="new-list" type="text" placeholder="List Title" />
			            <button className="new-list-submit cancel" onClick={this.toggleListForm}>Cancel</button>
			            <button className="new-list-submit add" onClick={this.addList}>Add List</button>
			            <button className="new-list-submit submit" onClick={this.editListName}>Submit</button>
			        </div>
			    </div>
			</div>
		);
	},
});

const EditNoteForm = React.createClass({ 
	toggleEditForm: function(){
		this.props.onForm();
	},
	addNote: function(){
		console.log(this.refs.noteText.value);
		this.props.onAdd(this.refs.noteText.value);
	},
	render: function () {
		return(
			//edit note modal form
			<div className="edit-card-modal modal">
			    <div className="card-selection">
			        <div className="note-card-selection">
			            <textarea className="note-input note yellow" type="text"></textarea> 
			            <button className="edit-note-submit cancel">Cancel</button>
			            <button className="edit-note-submit delete-button">Delete</button>
			           	<button className="edit-note-submit submit">Submit</button>
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