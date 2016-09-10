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
                  listEditFormOpen: false,
                  editFormOpen: false
            }
        );
    },
    toggleNoteForm: function(){
        this.setState({formOpen: !this.state.formOpen});
    },
    toggleListForm: function(){
        this.setState({listFormOpen: !this.state.listFormOpen});
    },
    toggleListEditForm: function(){
        this.setState({listEditFormOpen: !this.state.listEditFormOpen});
    },
    toggleEditNoteForm: function(){
        this.setState({editFormOpen: !this.state.editFormOpen});
    },
    addList: function(listTitle){
        this.toggleListForm();
        const lists = this.state.lists;
        lists.push({title: listTitle, cards: []});
        this.setState({lists: lists});
    },
    editList: function(listTitle){
        this.toggleListEditForm();
        const lists = this.state.lists;
        //do I still need to have an empty cards array if i'm not adding a new list?
        lists[this.state.currentList].title = listTitle;
        this.setState({lists: lists});
    },
    deleteList: function(index){
        const lists = this.state.lists;
        lists.splice(index,1);
        this.setState({lists: lists});
    },
    addNote: function(noteText){
        this.toggleNoteForm();
        const lists = this.state.lists;
        lists[this.state.currentList].cards.push({text: noteText});
        this.setState({lists: lists});
    },
    //why do I have editNote and editNoteForm??
    editNote: function(noteText){
        this.toggleEditNoteForm();
        const lists = this.state.lists;
        lists[this.state.currentList].cards[this.state.currentCard].text=noteText;
        this.setState({lists: lists});
    },
    addNoteForm: function(list){
        this.toggleNoteForm();
        this.setState({currentList: list});
    },
     //why do I have editNote and editNoteForm??
    editNoteForm: function(list, card, text){
        this.toggleEditNoteForm();
        this.setState({currentList: list, currentCard: card, currentText: text});
    },
    editListForm: function(list, title){
        console.log(list,title);
        this.toggleListEditForm();
        this.setState({currentList: list, currentListTitle: title});
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
                    onListEdit={this.editListForm}
                    onEditNote={this.editNoteForm}
                    onDelete={this.deleteList}
                />
            );
        });
        let noteForm, listForm, editForm, listEditForm;
        if (this.state.formOpen) {
              noteForm = <NoteForm onForm={this.toggleNoteForm} onAdd={this.addNote}/>;
        } else {
              noteForm = "";
        }
        if (this.state.listFormOpen) {
              listForm = <ListForm onForm={this.toggleListForm} onAdd={this.addList}/>;
        } else {
              listForm = "";
        }
        if (this.state.listEditFormOpen) {
              listEditForm = <ListEditForm onForm={this.toggleListEditForm} onListEdit={this.editList} listTitle={this.state.currentListTitle}/>;
        } else {
              listEditForm = "";
        }
        if (this.state.editFormOpen) {
              editForm = <EditNoteForm onForm={this.toggleEditNoteForm} onEditNote={this.editNote} currentCard={this.state.currentCard} currentText={this.state.currentText}/>;
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
                {listEditForm}
                {editForm}
            </div>
        );
    }
});

const List = React.createClass({ 
    toggleNoteForm: function(){
        this.props.onForm(this.props.index);
    },
    editListName: function(){
        this.props.onListEdit(this.props.index, this.props.title);
    },
    deleteList: function(){
        this.props.onDelete(this.props.index);
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
                    <p className="header-title" onClick={this.editListName}>
                        {this.props.title}
                    </p>
                    <p className="delete" onClick={this.deleteList}>x</p>
                </div>
                {notes}
                <button className="add-card" onClick={this.toggleNoteForm}>+</button>
            </div>
        );
    }
});

const Note = React.createClass({ 
    toggleEditNoteForm: function(){
        this.props.onForm(this.props.index);
    },
    editNoteText: function(){
        this.props.onEditNote(this.props.index, this.props.cards);
    },
    render: function () {
        return(
            <div className="note-container" onClick={this.editNoteText}>
                <i className="pin"></i>
                <p className="note yellow">
                    {this.props.text}
                </p>
            </div>
        );
    }
});

const NoteForm = React.createClass({ 
    toggleNoteForm: function(){
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
                        <button className="new-note-submit cancel" onClick={this.toggleNoteForm}>Cancel</button>
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
                    </div>
                </div>
            </div>
        );
    },
});

const ListEditForm = React.createClass({ 
    toggleListForm: function(){
        this.props.onForm();
    },
    editList: function(){
        this.props.onListEdit(this.refs.listTitle.value);
    },
    render: function () {
        //can i do an if statement here to toggle the list form with either submit or add?
        return(
            //add list modal form
            <div className="add-list-modal modal">
                <div className="list-selection">
                    <div className="note-list-selection">
                        <input ref="listTitle" className="new-list" type="text" placeholder="List Title" defaultValue={this.props.listTitle} />
                        <button className="new-list-submit cancel" onClick={this.toggleListForm}>Cancel</button>
                        <button className="new-list-submit submit" onClick={this.editList}>Submit</button>
                    </div>
                </div>
            </div>
        );
    },
});

const EditNoteForm = React.createClass({ 
    toggleEditNoteForm: function(){
        this.props.onForm();
    },
    editNote: function(){
        this.props.onEditNote(this.refs.noteText.value);
    },
    render: function () {
        return(
            //edit note modal form
            <div className="edit-card-modal modal">
                <div className="card-selection">
                    <div className="note-card-selection">
                        <textarea className="note-input note yellow" type="text">{this.refs.noteText.value}</textarea> 
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