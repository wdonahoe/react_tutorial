import AltContainer from 'alt-container';
import React from 'react';

import BaseComponent from './BaseComponent';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

import '../less/main.less'

export default class App extends BaseComponent {

	render() {
		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>
				<AltContainer stores={[NoteStore]} inject={{notes: () => NoteStore.getState().notes}}>
					<Notes onEdit={this.editNote} onDelete={this.deleteNote} />
				</AltContainer>
			</div>
		);
	}

	addNote() {
		NoteActions.create({task: 'New Task'});
	}

	editNote(id, task) {
		if (!task.trim())
			return;
		
		NoteActions.update({id, task});
	}

	deleteNote(id, event) {
		event.stopPropagation();

		NoteActions.delete(id);
	}

}