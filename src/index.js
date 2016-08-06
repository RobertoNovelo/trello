import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ListDashboard = React.createClass({ 
	render: function () {
		return(
			/*<div className="column">
				<EditableNoteList />
          		<ToggleableNoteForm
					isOpen={true} 
				/>
			</div>*/
			<div className="wrapper">
				<List />
				<List />
				<List />
			</div>
		);
	}
});

const List = React.createClass({ 
	render: function () {
		return(
			<div className="column">
	            <div className="column-header">
	                <p className="header-title">TO DO</p>
	                <p className="delete">x</p>
	            </div>
	            <Note />
	            <button className="add-card">+</button>
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
			        We can't solve problems by using the same kind of thinking we used when we created them.
			    </p>
			</div>
		);
	}
});

const NoteForm = React.createClass({ 
	render: function () {
		//modal form
	}
});


ReactDOM.render(
	<ListDashboard />,
	document.getElementById('root')
);